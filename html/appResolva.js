async function fetchReports() {
  console.log('Iniciando a busca de relatos...');

  const token = localStorage.getItem('authToken');

  try {
    const response = await fetch('http://192.168.0.16:8080/relatos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Resposta do servidor:', response);
    console.log('Dados recebidos:', data);

    if (response.status === 200) {
      renderReports(data.content);
    } else {
      console.error('Erro ao buscar relatos:', response.status, response.statusText);
      alert('Erro: Não foi possível carregar os relatos.');
    }
  } catch (error) {
    console.error('Erro de conexão:', error);
    alert('Erro: Falha na conexão. Tente novamente.');
  }
}

function renderReports(reports) {
  console.log('Renderizando relatos...');

  const reportsContainer = document.querySelector('.reports');
  reportsContainer.innerHTML = '<h2>Relatos dos Alunos</h2>';

  reports.forEach(report => {
    console.log('Processando relato:', report);

    const status = report.status === 'pendente' ? 'Aguardando Resposta' : 'Respondido';
    const statusColor = report.status === 'pendente' ? '#FFCF23' : '#34B951';

    const reportElement = document.createElement('div');
    reportElement.classList.add('report');

    reportElement.innerHTML = `
      <div class="report-header" onclick="toggleReport(this)">
        <span class="report-type">
          <span class="priority-indicator" style="background-color: ${statusColor};"></span>
          ${report.tipo}
        </span>
        <span class="status">${status}</span>
      </div>
      <div class="report-content">
        <div class="report-meta">
          <span class="report-date">${new Date(report.data).toLocaleDateString()}</span>
          <span class="report-id">#${report.idFormatado}</span>
        </div>
        <p>Aluno</p>
        <h3>${report.aluno}</h3>
        <p>Relato</p>
        <p class="report-description">${report.descricao}</p>
        <div class="button-container">
          <button class="response-btn" onclick="toggleResponseArea(this)">Responder</button>
        </div>
        <div class="school-response" style="display: none;">
          <p>Escola</p>
          <textarea class="response-textarea" rows="4"></textarea>
          <div class="button-container">
            <button class="conclude-btn" onclick="submitResponse(${report.id}, this)">Concluído</button>
          </div>
        </div>
      </div>
    `;

    reportsContainer.appendChild(reportElement);
  });
}

async function submitResponse(reportId, button) {
  const responseText = button.closest('.school-response').querySelector('.response-textarea').value;
  const token = localStorage.getItem('authToken');

  console.log(`Enviando resposta para o relato ID ${reportId}:`, responseText);

  try {
    const response = await fetch(`http://192.168.0.16:8080/relatos/responder/${reportId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ resposta: responseText }),
    });

    console.log('Resposta do backend:', response);

    if (response.ok) {
      console.log('Resposta enviada com sucesso!');
      alert('Resposta enviada com sucesso!');
      fetchReports();
    } else {
      console.error(`Erro ao enviar resposta (Status: ${response.status}):`, response.statusText);
      alert('Erro: Não foi possível enviar a resposta.');
    }
  } catch (error) {
    console.error('Erro ao enviar a resposta:', error);
    alert('Erro: Falha na conexão. Tente novamente.');
  }
}

function toggleReport(element) {
  const content = element.nextElementSibling;
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

function toggleResponseArea(button) {
  const responseArea = button.closest('.report-content').querySelector('.school-response');
  responseArea.style.display = responseArea.style.display === 'none' ? 'block' : 'none';
}

window.onload = fetchReports;
