from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from config.config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

migrate.init_app(app, db)

app.debug = True

@app.route('/api/orangtua/get', methods=['GET'])
def get_orangtua():
    orangtua = OrangTua.query.all()
    result = []

    for x in orangtua:
        data = {
            'id' : x.id,
            'nama' : x.nama,
            'alamat' : x.alamat,
            'provinsi' : x.provinsi,
            'kabupaten' : x.kabupaten,
            'kecamatan' : x.kecamatan,
            'desa' : x.desa,
            'posyandu' : x.posyandu,
            'rt' : x.rt,
            'rw' : x.rw 
        }
        result.append(data)
    
    return jsonify(result)

@app.route('/api/orangtua/add', methods=['POST'])
def add_orangtua():
    data = request.get_json()

    orangtua = OrangTua(
        nama = data['nama'],
        alamat = data['alamat'],
        provinsi = data['provinsi'],
        kabupaten = data['kabupaten'],
        kecamatan = data['kecamatan'],
        desa = data['desa'],
        posyandu = data['posyandu'],
        rt = data['rt'],
        rw = data['rw']
    )

    db.session.add(orangtua)
    db.session.commit()

    return jsonify({'message': 'Data orang tua berhasil ditambahkan'})

@app.route('/api/orangtua/update/<int:id>', methods=['PUT'])
def update_orangtua(id):
    data = request.get_json()

    orangtua = OrangTua.query.get(id)
    if orangtua is None:
        return jsonify({'message': 'Data orang tua tidak ditemukan'})
    
    orangtua.nama = data['nama']
    orangtua.alamat = data['alamat']
    orangtua.provinsi = data['provinsi']
    orangtua.kabupaten = data['kabupaten']
    orangtua.kecamatan = data['kecamatan']
    orangtua.desa = data['desa']
    orangtua.posyandu = data['posyandu']
    orangtua.rt = data['rt']
    orangtua.rw = data['rw']

    db.session.commit()

    return jsonify({'message': 'Data orang tua berhasil diupdate'})

@app.route('/api/orangtua/delete/<int:id>', methods=['DELETE'])
def delete_orangtua(id):
    orangtua = OrangTua.query.get(id)
    if orangtua is None:
        return jsonify({'message': 'Data orang tua tidak ditemukan'})
    
    db.session.delete(orangtua)
    db.session.commit()

    return jsonify({'message': 'Data orang tua berhasil dihapus'})


@app.route('/api/anak/get', methods=['GET'])
def get_anak():
    anak = Anak.query.all()
    result = []

    for x in anak:
        data = {
            'id' : x.id,
            'nik' : x.nik,
            'nama' : x.nama,
            'jenis_kelamin' : x.jenis_kelamin,
            'tanggal_lahir' : x.tanggal_lahir,
            'berat_lahir' : x.berat_lahir,
            'tinggi_lahir' : x.tinggi_lahir,
            'id_orang_tua' : x.id_orang_tua,
        }
        result.append(data)
    
    return jsonify(result)

@app.route('/api/anak/add', methods=['POST'])
def add_anak():
    data = request.get_json()

    anak = Anak(
        nik = data['nik'],
        nama = data['nama'],
        jenis_kelamin = data['jenis_kelamin'],
        tanggal_lahir = data['tanggal_lahir'],
        berat_lahir = data['berat_lahir'],
        tinggi_lahir = data['tinggi_lahir'],
        id_orang_tua = data['id_orang_tua']
    )
    db.session.add(anak)
    db.session.commit()

    return jsonify({'message': 'Data anak berhasil ditambahkan'})

@app.route('/api/anak/update/<int:id>', methods=['PUT'])
def update_anak(id):
    data = request.get_json()

    anak = Anak.query.get(id)
    if anak is None:
        return jsonify({'message': 'Data anak tidak ditemukan'})
    
    anak.nik = data['nik']
    anak.nama = data['nama']
    anak.jenis_kelamin = data['jenis_kelamin']
    anak.tanggal_lahir = data['tanggal_lahir']
    anak.berat_lahir = data['berat_lahir']
    anak.tinggi_lahir = data['tinggi_lahir']
    anak.id_orang_tua = data['id_orang_tua']

    db.session.commit()

    return jsonify({'message': 'Data anak berhasil diupdate'})

@app.route('/api/anak/delete/<int:id>', methods=['DELETE'])
def delete_anak(id):
    anak = Anak.query.get(id)
    if anak is None:
        return jsonify({'message': 'Data anak tidak ditemukan'})
    
    db.session.delete(anak)
    db.session.commit()

    return jsonify({'message': 'Data anak berhasil dihapus'})


@app.route('/api/gizi/get', methods=['GET'])
def get_gizi():
    gizi = Gizi.query.all()
    result = []

    for x in gizi:
        data = {
            'id' : x.id,
            'id_anak' : x.id_anak,
            'usia_diukur' : x.usia_diukur,
            'tanggal_pengukuran' : x.tanggal_pengukuran,
            'berat' : x.berat,
            'tinggi' : x.tinggi,
            'lingkar_lengan_atas' : x.lingkar_lengan_atas,
            'zz_bb_umur' : x.zz_bb_umur,
            'zz_bb_tb' : x.zz_bb_tb,
            'bb_umur' : x.bb_umur,
            'bb_tb' : x.bb_tb,
            'naik_berat_badan' : x.naik_berat_badan,
            'jumlah_vitamin_a' : x.jumlah_vitamin_a
        }
        result.append(data)
    
    return jsonify(result)

@app.route('/api/gizi/add', methods=['POST'])
def add_gizi():
    data = request.get_json()

    gizi = Gizi(
        id_anak = data['id_anak'],
        usia_diukur = data['usia_diukur'],
        tanggal_pengukuran = data['tanggal_pengukuran'],
        berat = data['berat'],
        tinggi = data['tinggi'],
        lingkar_lengan_atas = data['lingkar_lengan_atas'],
        zz_bb_umur = data['zz_bb_umur'],
        zz_bb_tb = data['zz_bb_tb'],
        bb_umur = data['bb_umur'],
        bb_tb = data['bb_tb'],
        naik_berat_badan = data['naik_berat_badan'],
        jumlah_vitamin_a = data['jumlah_vitamin_a']
    )

    db.session.add(gizi)
    db.session.commit()

    return jsonify({'message': 'Data gizi berhasil ditambahkan'})

@app.route('/api/gizi/update/<int:id>', methods=['PUT'])
def update_gizi(id):
    data = request.get_json()

    gizi = Gizi.query.get(id)
    if gizi is None:
        return jsonify({'message': 'Data gizi tidak ditemukan'})
    
    gizi.id_anak = data['id_anak']
    gizi.usia_diukur = data['usia_diukur']
    gizi.tanggal_pengukuran = data['tanggal_pengukuran']
    gizi.berat = data['berat']
    gizi.tinggi = data['tinggi']
    gizi.lingkar_lengan_atas = data['lingkar_lengan_atas']
    gizi.zz_bb_umur = data['zz_bb_umur']
    gizi.zz_bb_tb = data['zz_bb_tb']
    gizi.bb_umur = data['bb_umur']
    gizi.bb_tb = data['bb_tb']
    gizi.naik_berat_badan = data['naik_berat_badan']
    gizi.jumlah_vitamin_a = data['jumlah_vitamin_a']

    db.session.commit()

    return jsonify({'message': 'Data gizi berhasil diupdate'})

@app.route('/api/gizi/delete/<int:id>', methods=['DELETE'])
def delete_gizi(id):
    gizi = Gizi.query.get(id)
    if gizi is None:
        return jsonify({'message': 'Data gizi tidak ditemukan'})
    
    db.session.delete(gizi)
    db.session.commit()


@app.route('/api/user/get', methods=['GET'])
def get_user():
    users = User.query.all()
    result = []

    for user in users:
        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'password': user.password,
            'role': user.role
        }
        result.append(data)

    return jsonify(result)

@app.route('/api/user/add', methods=['POST'])
def add_user():
    data = request.get_json()

    user = User(
        username = data['username'],
        email = data['email'],
        password = data['password'],
        role = data['role']
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Data user berhasil ditambahkan'})

@app.route('/api/user/update/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()

    user = User.query.get(id)
    if user is None:
        return jsonify({'message': 'Data user tidak ditemukan'})
    
    user.username = data['username']
    user.email = data['email']
    user.password = data['password']
    user.role = data['role']

    db.session.commit()

    return jsonify({'message': 'Data user berhasil diupdate'})

@app.route('/api/user/delete/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({'message': 'Data user tidak ditemukan'})
    
    db.session.delete(user)
    db.session.commit()


if __name__ == '__main__':
    from models import OrangTua, Anak, Gizi, User
    app.run()



