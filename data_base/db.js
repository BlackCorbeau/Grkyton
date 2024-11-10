import sqlite3 from 'sqlite3'
const dbname = 'later.sqlite';
const db = new sqlite3.Database(dbname);

db.serialize(() => {
    const sportgroundTable = `
    CREATE TABLE IF NOT EXISTS "SportGround" (
        "id" INTEGER NOT NULL,
        "latitude" TEXT NOT NULL,
        "longitude" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "address" TEXT NOT NULL,
        PRIMARY KEY("id")
    );
    `;

    const sportTable = `
    CREATE TABLE IF NOT EXISTS "Sports" (
        "id" INTEGER NOT NULL,
        "title" TEXT NOT NULL,
        PRIMARY KEY("id")
    );
    `;

    const sportGraundSportTable = `
    CREATE TABLE IF NOT EXISTS "SportGroundSports" (
        "sportground_id" INTEGER NOT NULL,
        "sport_id" INTEGER NOT NULL,
        FOREIGN KEY("sportground_id") REFERENCES "SportGround"("id"),
        FOREIGN KEY("sport_id") REFERENCES "Sports"("id"),
        PRIMARY KEY("sportground_id", "sport_id")
    );
    `;

    const photoSportgroundTable = `
    CREATE TABLE IF NOT EXISTS "PhotoSportground" (
        "id" INTEGER NOT NULL,
        "sportground_id" INTEGER NOT NULL,
        "way" TEXT NOT NULL,
        PRIMARY KEY("id"),
        FOREIGN KEY("sportground_id") REFERENCES "SportGround"("id")
    );
    `;

    const eventTable = `
    CREATE TABLE IF NOT EXISTS "Event" (
        "id" INTEGER NOT NULL,
        "title" TEXT NOT NULL,
        "sport_id" INTEGER NOT NULL,
        "description" TEXT NOT NULL,
        "organizer" TEXT NOT NULL,
        "date" DATE NOT NULL,
        "time" TIMESTAMP NOT NULL,
        PRIMARY KEY("id"),
        FOREIGN KEY("sport_id") REFERENCES "Sports"("id")
    );
    `;

    const userTable = `
    CREATE TABLE IF NOT EXISTS "User" (
        "id" INTEGER NOT NULL,
        "nickname" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "photo" TEXT,
        PRIMARY KEY("id")
    );
    `;

    const adminTable = `
    CREATE TABLE IF NOT EXISTS "Admin" (
        "id" INTEGER NOT NULL,
        "login" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        PRIMARY KEY("id")
    );
    `;

    db.run(sportgroundTable, (err) => {
        if (err) {
            console.error('Error creating Sport Ground table', err);
        } else {
            console.log('Sport Ground table created successfully');
        }
    });

    db.run(sportTable, (err) => {
        if (err) {
            console.error('Error creating Sports table:', err);
        } else {
            console.log('Sports table created successfully');
        }
    });

    db.run(sportGraundSportTable, (err) => {
        if (err) {
            console.error('Error creating Sport Ground Sport table', err);
        } else {
            console.log('Sport Ground Sport table created successfully');
        }
    });

    db.run(photoSportgroundTable, (err) => {
        if (err) {
            console.error('Error creating PhotoSportground table:', err);
        } else {
            console.log('PhotoSportground table created successfully');
        }
    });

    db.run(eventTable, (err) => {
        if (err) {
            console.error('Error creating Event table:', err);
        } else {
            console.log('Event table created successfully');
        }
    });

    db.run(userTable, (err) => {
        if (err) {
            console.error('Error creating User table:', err);
        } else {
            console.log('User table created successfully');
        }
    });

    db.run(adminTable, (err) => {
        if (err) {
            console.error('Error creating Admin table:', err);
        } else {
            console.log('Admin table created successfully');
        }
    });
});


class SportGround {
    static allSportGrounds(cb) {
        db.all("SELECT * FROM SportGround", cb);
    }
    
    static addSportGround(latitude, longitude, description, address, cb) {
        const sql = "INSERT INTO SportGround (latitude, longitude, description, address) VALUES (?, ?, ?, ?)";
        db.run(sql, latitude, longitude, description, address, cb);
    }
     
    static updateSportGrounds(id, latitude, longitude, description, address, cb) {
        const sql = "UPDATE SportGround SET latitude = ?, longitude = ?, description = ?, address = ? WHERE id = ?";
        db.run(sql, latitude, longitude, description, address, id, cb);
    }

    static deleteSportGround(id, cb) {
        const sql = "DELETE FROM SportGround WHERE id = ?";
        db.run(sql, id, cb);
    }

}

class Sports {
    static allSports(cb) {
        db.all("SELECT * FROM Sports", cb);
    }

    static addSport(title, sportground_id, cb) {
        const sql = "INSERT INTO Sports (title, sportground_id) VALUES (?, ?)";
        db.run(sql, [title, sportground_id], cb);
    }

    static updateSport(id, title, sportground_id, cb) {
        const sql = "UPDATE Sports SET title = ?, sportground_id = ? WHERE id = ?";
        db.run(sql, [title, sportground_id, id], cb);
    }

    static deleteSport(id, cb) {
        const sql = "DELETE FROM Sports WHERE id = ?";
        db.run(sql, [id], cb);
    }
}
