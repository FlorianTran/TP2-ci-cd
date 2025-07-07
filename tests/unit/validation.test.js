const express = require('express');
const request = require('supertest');
const app = require('../../src/app');

// Mock de la base de données pour les tests
jest.mock('../../src/db/connection', () => ({
  query: jest.fn(),
  initDatabase: jest.fn().mockResolvedValue()
}));

describe('Validation des soumissions', () => {
  test('devrait accepter des données valides', async () => {
    const { query } = require('../../src/db/connection');
    query.mockResolvedValueOnce({ insertId: 1 });
    
    const response = await request(app)
      .post('/submit')
      .send({
        name: 'Test User',
        email: 'test@example.com'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Soumission enregistrée avec succès');
  });
  
  test('devrait rejeter un nom vide', async () => {
    const response = await request(app)
      .post('/submit')
      .send({
        name: '',
        email: 'test@example.com'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Le nom est requis');
  });
  
  test('devrait rejeter un email vide', async () => {
    const response = await request(app)
      .post('/submit')
      .send({
        name: 'Test User',
        email: ''
      });
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('L\'email est requis');
  });
  
  test('devrait rejeter un email invalide', async () => {
    const response = await request(app)
      .post('/submit')
      .send({
        name: 'Test User',
        email: 'invalid-email'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('L\'email n\'est pas valide');
  });
  
  test('devrait rejeter des données manquantes', async () => {
    const response = await request(app)
      .post('/submit')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Le nom est requis');
    expect(response.body.errors).toContain('L\'email est requis');
  });
}); 