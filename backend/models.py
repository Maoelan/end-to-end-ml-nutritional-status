from app import db

class orangtua(db.Model):
    __tablename__ = 'data_orang_tua'

    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(255))
    alamat = db.Column(db.String(255))
    provinsi = db.Column(db.String(100))
    kabupaten = db.Column(db.String(100))
    kecamatan = db.Column(db.String(100))
    desa = db.Column(db.String(100))
    posyandu = db.Column(db.String(100))
    rt = db.Column(db.String(10))
    rw = db.Column(db.String(10))

class anak(db.Model):
    __tablename__ = 'data_anak'

    id = db.Column(db.Integer, primary_key=True)
    nik = db.Column(db.String(16))
    nama  = db.Column(db.String(255))
    jenis_kelamin = db.Column(db.String(10))
    tanggal_lahir = db.Column(db.Data)
    berat_lahir = db.Column(db.Flaot(5,2))
    tinggi_lahir = db.Column(db.Float(5,2))
    id_orangtua = db.Column(db.Integer, db.ForeignKey('data_orang_tua.id'))
    
    orangtua = db.relationship('orangtua', backref=db.backref('anak', lazy=True))

class gizi(db.model):
    __tablename__ = 'data_gizi'
    
    id = db.Column(db.Integer, primary_key=True)
    id_anak = db.column(db.Integer, db.ForeignKey('data_anak.id'))
    usia_diukur = db.Column(db.Integer)
    tanggal_pengukuran = db.Column(db.Data)
    berat = db.Column(db.Float(5,2))
    tinggi = db.Column(db.Float(5,2))
    lingkar_lengan_atas = db.Column(db.Float(5,2))
    zs_bb_umur = db.Column(db.Float(5,2))
    zz_bb_tb = db.Column(db.Float(5,2))
    bb_umur = db.Column(db.Float(5,2))
    bb_tb = db.Column(db.Float(5,2))
    naik_berat_badan = db.Column(db.String(10))
    jumlah_vitamin_a = (db.Integer)
    
        

