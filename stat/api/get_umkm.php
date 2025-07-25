<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Tambahkan untuk development

$conn = new mysqli("localhost", "root", "", "db_umkm");

if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

$sql = "SELECT id, nama, nama_usaha, produk, kategori, alamat, rt, rw, status_nib FROM umkm";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
