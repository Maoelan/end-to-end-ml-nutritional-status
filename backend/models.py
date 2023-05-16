from app import db

class OrangTua(db.Model):
    __tablename__ = 'data_orang_tua'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(255))
    alamat = db.Column(db.String(255))
    provinsi = db.Column(db.String(100))
    kabupaten = db.Column(db.String(100))
    kecamatan = db.Column(db.String(100))
    desa = db.Column(db.String(100))
    posyandu = db.Column(db.String(100))
    rt = db.Column(db.String(10))
    rw = db.Column(db.String(10))
    anak = db.relationship('Anak', backref='orang_tua', lazy=True)

class Anak(db.Model):
    __tablename__ = 'data_anak'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nik = db.Column(db.String(16))
    nama = db.Column(db.String(255))
    jenis_kelamin = db.Column(db.String(10))
    tanggal_lahir = db.Column(db.Date)
    berat_lahir = db.Column(db.Float(5, 2))
    tinggi_lahir = db.Column(db.Float(5, 2))
    id_orang_tua = db.Column(db.Integer, db.ForeignKey('data_orang_tua.id'))
    data_gizi = db.relationship('Gizi', backref='anak', lazy=True)

class Gizi(db.Model):
    __tablename__ = 'data_gizi'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_anak = db.Column(db.Integer, db.ForeignKey('data_anak.id'))
    usia_diukur = db.Column(db.Integer)
    tanggal_pengukuran = db.Column(db.Date)
    berat = db.Column(db.Float(5, 2))
    tinggi = db.Column(db.Float(5, 2))
    lingkar_lengan_atas = db.Column(db.Float(5, 2))
    zs_bb_umur = db.Column(db.Float(5, 2))
    zs_bb_tb = db.Column(db.Float(5, 2))
    bb_umur = db.Column(db.Float(5, 2))
    bb_tb = db.Column(db.Float(5, 2))
    naik_berat_badan = db.Column(db.String(10))
    jumlah_vitamin_a = db.Column(db.Integer)

class User(db.Model):
    __tablename__ = 'data_user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255))
    email = db.Column(db.String(255))
    password = db.Column(db.String(255))
    role = db.Column(db.String(50))
        

