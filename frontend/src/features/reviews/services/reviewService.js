// features/reviews/services/reviewService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const getReviewsByProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/reviews/product/${productId}`);
    if (!response.ok) throw new Error('Erreur lors du chargement des avis');
    return await response.json();
  } catch (error) {
    console.error('Erreur getReviewsByProduct:', error);
    throw error;
  }
};

export const addReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'ajout de l\'avis');
    return await response.json();
  } catch (error) {
    console.error('Erreur addReview:', error);
    throw error;
  }
};

export const getAverageRating = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/reviews/product/${productId}/average`);
    if (!response.ok) throw new Error('Erreur lors du chargement de la moyenne');
    return await response.json();
  } catch (error) {
    console.error('Erreur getAverageRating:', error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
    return await response.json();
  } catch (error) {
    console.error('Erreur deleteReview:', error);
    throw error;
  }
};