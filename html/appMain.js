document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq_item span').forEach((button, index) => {
    button.addEventListener('click', () => {
      const answer = document.querySelectorAll('.faq_answer')[index];
      const isVisible = answer.style.display === 'block';
      document.querySelectorAll('.faq_answer').forEach(answer => answer.style.display = 'none'); // Esconde todas as respostas
      document.querySelectorAll('.faq_item span').forEach(span => span.textContent = '+'); // Reseta o símbolo de todos os spans
      if (!isVisible) {
        answer.style.display = 'block';
        button.textContent = '-';
      }
    });
  });
});
