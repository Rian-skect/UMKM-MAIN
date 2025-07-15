// Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function toggleSidebar() {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('show');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    sidebarToggle?.addEventListener('click', toggleSidebar);
    sidebarOverlay?.addEventListener('click', closeSidebar);

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });

    // Close sidebar when clicking close button
    const sidebarClose = document.getElementById('sidebarClose');
    sidebarClose?.addEventListener('click', closeSidebar);

    // Close sidebar when clicking any sidebar link (mobile)
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeSidebar();
      });
    });

    // Bar chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['RT 01', 'RT 02', 'RT 03', 'RT 04', 'RT 05', 'RT 06', 'RT 07', 'RT 08'],
        datasets: [{
          label: 'Jumlah UMKM',
          data: [12, 19, 8, 15, 12, 18, 14, 11],
         backgroundColor: 'rgba(166, 124, 82, 0.8)', 
          borderColor: 'rgba(166, 124, 82, 1)',       
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(166, 124, 82, 1)',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { 
              stepSize: 5,
              color: '#666'
            },
            grid: { 
              color: 'rgba(0, 0, 0, 0.1)',
              drawBorder: false
            }
          },
          x: {
            ticks: { color: '#666' },
            grid: { display: false }
          }
        }
      }
    });

    // Pie chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Makanan', 'Jasa'],
        datasets: [{
          data: [58, 42],
          backgroundColor: [
            'rgba(166, 124, 82, 0.8)',
            'rgba(172, 147, 110, 0.9)',
          ],
          borderColor: 'white',
          borderWidth: 2,
          hoverOffset: 10
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 15,
              padding: 15,
              font: { size: 14 },
              color: '#463a2e'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        },
        cutout: '50%'
      }
    });

    // Add click event listeners to navbar and sidebar to navigate to statistik.html
    document.getElementById('navbar').addEventListener('click', function() {
      window.location.href = 'statistik.html';
    });

    document.getElementById('sidebar').addEventListener('click', function() {
      window.location.href = 'statistik.html';
    });