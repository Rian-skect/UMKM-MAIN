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
    if (sidebarClose) {
      sidebarClose.addEventListener('click', closeSidebar);
    }

    // Close sidebar when clicking any sidebar link (mobile)
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeSidebar();
      });
    });

      // Close sidebar on escape key
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
              closeSidebar();
          }
      });

      // Handle window resize
      window.addEventListener('resize', () => {
          if (window.innerWidth >= 1024) {
              closeSidebar();
          }
      });

        const doughnutData = {
            labels: ['Tidak', 'Ya'],
            datasets: [{
                data: [674, 158],
                backgroundColor: ['#D7C0A6', '#A67C52'],
                borderColor: ['#D7C0A6', '#A67C52'],
                borderWidth: 2
            }]
        };

        // Chart options with integrated legends
        const barOptions = {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', // This makes it horizontal
            plugins: {
                legend: {
                    display: false // Hide legend for horizontal bar chart
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'UMKM ' + context.parsed.x.toLocaleString('id-ID');
                        }
                    }
                },

            // Add value labels plugin specifically for bar chart
              valueLabels: {
              display: true
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(75, 57, 36, 0.1)'
                    },
                    ticks: {
                        color: '#4b3924',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return '' + value.toLocaleString('id-ID');
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#4b3924',
                        font: {
                            size: 11
                        },
                        maxTicksLimit: 10
                    }
                }
            },
            layout: {
                padding: {
                    right: 100 // Space for value labels
                }
            },
            onHover: (event, activeElements) => {
                event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
            }
        };

        // Add value labels plugin specifically for bar charts only
        Chart.register({
            id: 'valueLabels',
            afterDatasetsDraw: function(chart) {
                // Check if this is a bar chart and if value labels are enabled
                if (chart.config.type === 'bar' && 
                    chart.config.options.plugins.valueLabels && 
                    chart.config.options.plugins.valueLabels.display) {
                    
                    const ctx = chart.ctx;
                    chart.data.datasets.forEach((dataset, i) => {
                        const meta = chart.getDatasetMeta(i);
                        meta.data.forEach((bar, index) => {
                            const data = dataset.data[index];
                            ctx.fillStyle = '#4b3924';
                            ctx.font = '12px Arial';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(
                                ' ' + data.toLocaleString('id-ID'),
                                bar.x + 5,
                                bar.y
                            );
                        });
                    });
                }
            }
        });

        const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // We'll use custom legend
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        return label + ': ' + value + '%';
                    }
                }
            }
        },
        onHover: (event, activeElements) => {
            event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
        }
    };

    const doughnutOptions = {
        responsive: false,
        maintainAspectRatio: false,
        cutout: '50%',
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                    font: {
                        size: 14,
                        weight: 600
                    },
                    color: '#4b3924'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.parsed + 'UMKM';
                    }
                }
            }
        }
    };

        // Plugin untuk label di pie chart
const pieLabelsPlugin = {
    id: 'labelOnPie',
    afterDatasetDraw(chart) {
        const { ctx } = chart;
        const dataset = chart.data.datasets[0];
        const meta = chart.getDatasetMeta(0);
        const total = dataset.data.reduce((a, b) => a + b, 0);
        
        ctx.save();
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        meta.data.forEach((arc, i) => {
            const angle = (arc.startAngle + arc.endAngle) / 2;
            const r = (arc.outerRadius + arc.innerRadius) / 2;
            const x = chart.width / 2 + r * Math.cos(angle);
            const y = chart.height / 2 + r * Math.sin(angle);
            const value = dataset.data[i];
            const percent = Math.round((value / total) * 100);
            
            // Only show label if percentage is >= 3%
            if (percent >= 3) {
                ctx.fillText(`${value}`, x, y - 7);
                ctx.fillText(`(${percent}%)`, x, y + 7);
            }
        });
        ctx.restore();
    }
};

// Plugin untuk label di donut chart (diperbaiki agar lebih tengah)
const doughnutLabelsPlugin = {
    id: 'labelInsideSlice',
    afterDatasetDraw(chart) {
        const { ctx } = chart;
        const dataset = chart.data.datasets[0];
        const meta = chart.getDatasetMeta(0);
        const total = dataset.data.reduce((a, b) => a + b, 0);

        ctx.save();
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        meta.data.forEach((arc, i) => {
            const angle = (arc.startAngle + arc.endAngle) / 2;
            // Posisi lebih presisi di tengah slice
            const radius = arc.innerRadius + (arc.outerRadius - arc.innerRadius) * 0.5;
            const x = chart.chartArea.left + (chart.chartArea.width / 2) + radius * Math.cos(angle);
            const y = chart.chartArea.top + (chart.chartArea.height / 2) + radius * Math.sin(angle);

            const value = dataset.data[i];
            const percent = Math.round((value / total) * 100);

            // Hanya tampilkan label jika persentase >= 3%
            if (percent >= 3) {
                ctx.fillText(`${value}`, x, y - 7);
                ctx.fillText(`(${percent}%)`, x, y + 7);
            }
        });

        ctx.restore();
    }
};

 document.addEventListener('DOMContentLoaded', function() {
});

    // Handle window resize
    window.addEventListener('resize', function() {
      // Charts will automatically resize due to responsive: true option
    });

    // Animate numbers on page load
    function animateNumbers() {
      const statsElements = [
        { element: document.getElementById('aktif-umkm'), target: 22 },
        { element: document.getElementById('total-umkm'), target: 25 },
        { element: document.getElementById('total-rw'), target:  19},
        { element: document.getElementById('total-pemilik'), target: 25 }
      ];

      statsElements.forEach(({ element, target }) => {
        if (element) {
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              element.textContent = target;
              clearInterval(timer);
            } else {
              element.textContent = Math.floor(current);
            }
          }, 30);
        }
      });
    }
    let UMKM_DATA = [];
    let filteredData = [];
    let currentPage = 1;
    const itemsPerPage = 10;

   fetch('api/get_umkm.php')
  .then(response => response.json())
  .then(data => {
    console.log("Data dari server:", data); // Cek apakah berhasil
    UMKM_DATA = data;
    filteredData = [...UMKM_DATA];
    renderTable(filteredData, currentPage);

    const categoryCounts = {};
    UMKM_DATA.forEach(item => {
  const kategori = item.kategori?.trim();
  if (kategori) {
    categoryCounts[kategori] = (categoryCounts[kategori] || 0) + 1;
  }
});

const labels = Object.keys(categoryCounts);
const dataChart = Object.values(categoryCounts);

 console.log("Labels bar chart:", labels);
    console.log("Data bar chart:", dataChart);

    
              // Update deskripsi UMKM Unggulan dari data status NIB
    const total = UMKM_DATA.length;
    const memiliki = UMKM_DATA.filter(d => d.status_nib?.toLowerCase().trim() === "sudah memiliki").length;
    const belum = total - memiliki;
    const persenMemiliki = ((memiliki / total) * 100).toFixed(1);
    const persenBelum = (100 - persenMemiliki).toFixed(1);

    const summaryText = `
      Berdasarkan data yang terhimpun, <strong>UMKM unggulan</strong> di Kelurahan Kahuripan dikategorikan berdasarkan kelengkapan surat keterangan usaha (NIB), 
      yaitu <strong>${persenMemiliki}%</strong> sudah memiliki Surat Keterangan Usaha dan <strong>${persenBelum}%</strong> belum memiliki. 
      Informasi ini dapat digunakan sebagai dasar pengembangan program legalitas UMKM.
      
    `;
    
    // Warna
    const backgroundColor = [
      '#4E342E', // dark cocoa
      '#6D4C41', // earthy brown
      '#8D6E63', // grey-brown
      '#A1887F', // warm brown
      '#5D4037', // deep coffee
      '#795548', // soft dark brown
      '#3E2723', // darkest brown
      '#A0522D', // sienna
      '#7B3F00', // chocolate root
      '#C49E8A', // clay
      '#A9746E', // dusty red-brown
      '#B86B40', // toffee
      '#D2691E', // bold chocolate
      '#996633', // wood
      '#8B5A2B'  // bronze
    ];

const borderColor = backgroundColor.map(() => '#ffffff'); // garis pemisah antar slice


if (window.kategoriPieChart) {
  window.kategoriPieChart.destroy();
}

    document.getElementById("nib-summary").innerHTML = summaryText;
    // === PIE CHART NIB START ===

const pieLabels = ['Sudah Memiliki NIB', 'Belum Memiliki NIB'];
const pieData = [memiliki, belum];
const pieBackgroundColor = ['#A67C52', '#D7C0A6'];

if (window.kategoriPieChart) {
  window.kategoriPieChart.destroy();
}

// Membuat doughnut chart dengan plugin yang diperbaiki
const doughnutChart = new Chart(document.getElementById('doughnutChart'), {
    type: 'doughnut',
    data: doughnutData,
    options: doughnutOptions,
    plugins: [doughnutLabelsPlugin]
});

// Membuat pie chart dengan labels angka
const ctxPie = document.getElementById('pieChart')?.getContext('2d');
if (ctxPie) {
    window.kategoriPieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: pieLabels,
            datasets: [{
                data: pieData,
                backgroundColor: pieBackgroundColor,
                borderColor: ['#ffffff', '#ffffff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const totalPie = pieData.reduce((a, b) => a + b, 0);
                            const value = context.parsed;
                            const percentage = ((value / totalPie) * 100).toFixed(1);
                            return `${context.label}: ${value} UMKM (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [pieLabelsPlugin] // Menambahkan plugin labels
    });
}

// === PIE CHART NIB END ===

// Siapkan data bar chart
const barData = {
    labels: labels,
    datasets: [{
        label: 'Jumlah UMKM',
        data: dataChart,
        backgroundColor: backgroundColor.slice(0, labels.length),
        borderColor: borderColor.slice(0, labels.length),
        borderWidth: 1
    }]
};

const ctxBar = document.getElementById('barChart')?.getContext('2d');
if (ctxBar) {
    if (window.kategoriBarChart) {
        window.kategoriBarChart.destroy();
    }

    window.kategoriBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: barData,
        options: barOptions
    });

// === Dashboard Stats ===

document.getElementById('total-umkm').textContent = UMKM_DATA.length;

const totalSKU = UMKM_DATA.filter(
  d => d.status_nib?.toLowerCase().trim() === "sudah memiliki"
).length;

const belumSKU = UMKM_DATA.filter(
  d => d.status_nib?.toLowerCase().trim() !== "sudah memiliki"
).length;

document.getElementById('umkm-nib').textContent = totalSKU;
document.getElementById('no-nib-count').textContent = belumSKU;

const uniqueRW = new Set(UMKM_DATA.map(d => d.rw)).size;
document.getElementById('total-rw').textContent = uniqueRW;

}

  })
  .catch(error => console.error("Fetch error:", error));


    // Get category styling class
    function getCategoryClass(category) {
      const classes = {
        'Kuliner / Makanan & Minuman': 'kuliner',
        'Jasa': 'jasa',
        'Perdagangan Online': 'online',
        'Toko Kelontong / Sembako / Eceran': 'toko',
        'Produksi dan Penjualan Barang': 'produksi',
        'Pertanian & Peternakan': 'pertanian',
        'Pendidikan & Layanan Khusus': 'pendidikan',
        'Kos-kosan / Kontrakan / Penyewaan Properti': 'properti',
        'Jual Pulsa / Produk Digital': 'pulsa',
        'Otomotif / Bengkel': 'otomotif'
      };
      return classes[category] || 'bg-gray-100 text-gray-800';
    }

    // Render table
    function renderTable(data, page = 1) {
      const tbody = document.getElementById('umkm-table-body');
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageData = data.slice(startIndex, endIndex);

      tbody.innerHTML = pageData.map((item, index) => `
        <tr class="table-row border-b border-gray-100">
          <td class="px-6 py-4 font-medium text-[#6b5842]">${startIndex + index + 1}</td>
          <td class="px-6 py-4 font-medium text-[#6b5842]">${item.nama}</td>
          <td class="px-6 py-4">
            <span class="px-3 py-1 text-xs font-semibold rounded-full ${getCategoryClass(item.kategori)}">
              ${item.kategori}
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-600">${item.alamat}</td>
          <td class="px-6 py-4">
            <span class="px-3 py-1 text-xs font-semibold rounded-full ${
              item.status_nib && item.status_nib.toLowerCase() === 'sudah memiliki'

 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }">
              ${item.status_nib}
            </span>
          </td>
        </tr>
      `).join('');

      renderPagination(data, page);
    }

    // Function untuk update info data
    function updateDataInfo(data, currentPage) {
      const totalData = data.length;
      const startIndex = (currentPage - 1) * itemsPerPage + 1;
      const endIndex = Math.min(currentPage * itemsPerPage, totalData);
      
      const dataInfo = document.getElementById('data-info');
      if (totalData === 0) {
        dataInfo.textContent = 'Tidak ada data yang ditampilkan';
      } else {
        dataInfo.textContent = `Menampilkan ${startIndex} sampai ${endIndex} dari ${totalData} data`;
      }
    }

    // Render pagination
    function renderPagination(data, currentPage) {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      const paginationNumbers = document.getElementById('pagination-numbers');
      const prevBtn = document.getElementById('prev-page');
      const nextBtn = document.getElementById('next-page');

      // Update info data
      updateDataInfo(data, currentPage);

      // Update button states
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages || totalPages === 0;

      // Generate page numbers with box styling
      let paginationHTML = '';
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
          <button class="pagination-number ${i === currentPage ? 'active' : ''}" 
                  onclick="goToPage(${i})">${i}</button>
        `;
      }

      paginationNumbers.innerHTML = paginationHTML;
    }

    // Go to specific page
    function goToPage(page) {
      currentPage = page;
      renderTable(filteredData, currentPage);
    }

    // Previous page
    document.getElementById('prev-page').addEventListener('click', () => {
      if (currentPage > 1) {
        goToPage(currentPage - 1);
      }
    });

    // Next page
    document.getElementById('next-page').addEventListener('click', () => {
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
      if (currentPage < totalPages) {
        goToPage(currentPage + 1);
      }
    });

      // Initialize table when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      renderTable(UMKM_DATA, currentPage);
    });

    // Filter functionality
    function applyFilters() {
      const kategori = document.getElementById('kategori-umkm').value;
      const statusNIB = document.getElementById('status-nib').value;
      const rw = document.getElementById('rw').value;

      filteredData = UMKM_DATA.filter(item => {
        return (kategori === 'all' || item.kategori.toLowerCase() === kategori) &&
               (rw === 'all' || item.rw === rw) &&
               (statusNIB === 'all' || 
                (statusNIB === 'Memiliki' && item.status_nib === 'Sudah Memiliki') ||
                (statusNIB === 'Belum' && item.status_nib === 'Belum Memiliki '));
      });

      currentPage = 1;
      renderTable(filteredData, currentPage);
    }

    // Reset filters
    function resetFilters() {
      document.getElementById('filter-form').reset();
      document.getElementById('search-input').value = '';
      filteredData = [...UMKM_DATA];
      currentPage = 1;
      renderTable(filteredData, currentPage);

    }

    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      if (searchTerm === '') {
        filteredData = [...UMKM_DATA];
      } else {
        filteredData = UMKM_DATA.filter(item => 
          item.nama.toLowerCase().includes(searchTerm) ||
          item.kategori.toLowerCase().includes(searchTerm) ||
          item.alamat.toLowerCase().includes(searchTerm)
        );
      }
      
      currentPage = 1;
      renderTable(filteredData, currentPage);
    });

    // Event listeners
    document.getElementById('filter-form').addEventListener('submit', (e) => {
      e.preventDefault();
      applyFilters();
    });

    document.getElementById('filter-form').addEventListener('reset', () => {
      setTimeout(resetFilters, 100);
    });

    
