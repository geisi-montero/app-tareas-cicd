const request = require('supertest');
const { createApp } = require('../../src/app');

describe('API de tareas', () => {
  let app;
  beforeEach(() => { app = createApp(); });

  test('GET /health responde ok', async () => {
    const r = await request(app).get('/health');
    expect(r.status).toBe(200);
    expect(r.body.estado).toBe('ok');
  });

  test('POST /api/tareas crea una tarea', async () => {
    const r = await request(app).post('/api/tareas').send({ titulo: 'Configurar pipeline' });
    expect(r.status).toBe(201);
    expect(r.body).toMatchObject({ id: 1, titulo: 'Configurar pipeline', completada: false });
  });

  test('POST /api/tareas sin título devuelve 400', async () => {
    const r = await request(app).post('/api/tareas').send({});
    expect(r.status).toBe(400);
  });

  test('PATCH /api/tareas/:id alterna completada', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Escribir pruebas' });
    const r = await request(app).patch('/api/tareas/1');
    expect(r.body.completada).toBe(true);
  });

  test('PATCH de una tarea inexistente devuelve 404', async () => {
    const r = await request(app).patch('/api/tareas/99');
    expect(r.status).toBe(404);
  });

  test('GET /metrics cuenta solicitudes y tareas', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Medir' });
    const r = await request(app).get('/metrics');
    expect(r.body.tareas).toBe(1);
    expect(r.body.solicitudes).toBeGreaterThanOrEqual(2);
  });
});

// ---- Pruebas nuevas de la práctica ----
describe('API de tareas', () => {
  let app;
  beforeEach(() => { app = createApp(); });

  test('DELETE /api/tareas/:id elimina la tarea (204)', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Borrar esta' });
    const r = await request(app).delete('/api/tareas/1');
    expect(r.status).toBe(204);
    const lista = await request(app).get('/api/tareas');
    expect(lista.body).toHaveLength(0);
  });

  test('DELETE de una tarea inexistente devuelve 404', async () => {
    const r = await request(app).delete('/api/tareas/99');
    expect(r.status).toBe(404);
  });

  test('POST con título de más de 100 caracteres devuelve 400', async () => {
    const r = await request(app).post('/api/tareas').send({ titulo: 'x'.repeat(101) });
    expect(r.status).toBe(400);
    expect(r.body.error).toMatch(/100/);
  });

  test('los IDs no se repiten después de borrar una tarea', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'A' });
    await request(app).post('/api/tareas').send({ titulo: 'B' });
    await request(app).delete('/api/tareas/1');
    const c = await request(app).post('/api/tareas').send({ titulo: 'C' });
    expect(c.body.id).toBe(3); // con el contador original de la plantilla sería 2 (duplicado)
  });

  test('flujo completo: crear → completar → listar → borrar', async () => {
    const creada = await request(app).post('/api/tareas').send({ titulo: 'Flujo' });
    await request(app).patch(`/api/tareas/${creada.body.id}`);
    const lista = await request(app).get('/api/tareas');
    expect(lista.body[0]).toMatchObject({ titulo: 'Flujo', completada: true });
    await request(app).delete(`/api/tareas/${creada.body.id}`);
    const final = await request(app).get('/api/tareas');
    expect(final.body).toEqual([]);
  });

  test('GET /metrics refleja el borrado de tareas', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Temporal' });
    await request(app).delete('/api/tareas/1');
    const r = await request(app).get('/metrics');
    expect(r.body.tareas).toBe(0);
  });
});
