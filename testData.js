//Purpose: Entering test data into the database.
let bcrypt = require("bcryptjs");

module.exports = function (db) {
    //====================================
    //Roles
    //====================================
    const ROLES = [
        {
            id: 1,
            name: "public"
        }, 
        {
            id: 2,
            name: "admin"
        }, 
        {
            id: 3,
            name: "business"
        }, 
        {
            id: 4,
            name: "tracer"
        }
    ];

    //====================================
    //Users
    //====================================
    const USERS = [
        //Public users
        {
            username: "Vipul",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 1
        },
        {
            username: "Param",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 1
        },
        {
            username: "Edward",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 1
        },
        {
            username: "Isaac",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 1
        },
        {
            username: "Suliman",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 1
        },
        //Admin user
        {
            username: "Admin",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 2
        },
        //Business users
        {
            username: "CompanyA",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 3
        },
        {
            username: "CompanyB",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 3
        },
        {
            username: "CompanyC",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 3
        },
        {
            username: "CompanyD",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 3
        },
        {
            username: "CompanyE",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 3
        },
        //Contact Tracer users
        {
            username: "TracerA",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 4
        },
        {
            username: "TracerB",
            password: bcrypt.hashSync("123456", 8),
            RoleId: 4
        }
    ];

    //====================================
    //Accounts
    //====================================
    PUBLIC = [
        {
            name: "Vipul Tomar",
            email: "vt@gmail.com",
            phone: "0412345678",
            UserId: 1
        },
        {
            name: "Paramveer",
            email: "p@gmail.com",
            phone: "0423456789",
            UserId: 2
        },
        {
            name: "Edward Coad",
            email: "ed@gmail.com",
            phone: "0434567890",
            UserId: 3
        },
        {
            name: "Isaac",
            email: "i@gmail.com",
            phone: "0445678901",
            UserId: 4
        },
        {
            name: "Suliman",
            email: "s@gmail.com",
            phone: "0456789012",
            UserId: 5
        }
    ];

    ADMIN = [
        {
            name: "Admin Worker",
            email: "aw@gmail.com",
            phone: "0467890123",
            UserId: 6
        }
    ];

    BUSINESS = [
        {
            businessName: "Company A",
            email: "ca@gmail.com",
            phone: "0478901234",
            locations: [
                "6 Prospect Rd, Fitzroy SA 5082", 
                "154-160 Prospect Rd, Prospect SA 5082",
                "2A Percy St, Prospect SA 5082"
            ],
            approved: 1,
            UserId: 7
        },
        {
            businessName: "Company B",
            email: "cb@gmail.com",
            phone: "0478901235",
            locations: null,
            approved: 0,
            UserId: 8
        },
        {
            businessName: "Company C",
            email: "cc@gmail.com",
            phone: "0478901236",
            locations: ["186 Archer St, North Adelaide SA 5006"],
            approved: 1,
            UserId: 9
        },
        {
            businessName: "Company D",
            email: "cd@gmail.com",
            phone: "0478901237",
            locations: null,
            approved: 0,
            UserId: 10
        },
        {
            businessName: "Company E",
            email: "ce@gmail.com",
            phone: "0478901238",
            locations: ["31 D'Erlanger Ave, Collinswood SA 5081"],
            approved: 1,
            UserId: 11
        }
    ];

    TRACER = [
        {
            name: "Tracer A",
            email: "ta@gmail.com",
            phone: "0478901239",
            approved: 1,
            UserId: 12
        },
        {
            name: "Tracer B",
            email: "tb@gmail.com",
            phone: "0478901230",
            approved: 0,
            UserId: 13
        }
    ];

    //====================================
    //Terminals
    //====================================
    TERMINALS = [
        {
            serialNumber: 1,
            location: "6 Prospect Rd, Fitzroy SA 5082",
            BusinessId: 1
        },
        {
            serialNumber: 2,
            location: "154-160 Prospect Rd, Prospect SA 5082",
            BusinessId: 1
        },
        {
            serialNumber: 3,
            location: "2A Percy St, Prospect SA 5082",
            BusinessId: 1
        },
        {
            serialNumber: 4,
            location: "186 Archer St, North Adelaide SA 5006",
            BusinessId: 3
        },
        {
            serialNumber: 5,
            location: "31 D'Erlanger Ave, Collinswood SA 5081",
            BusinessId: 5
        }
    ];

    //====================================
    //Checkins
    //====================================
    CHECKINS = [
        {
            location: "6 Prospect Rd, Fitzroy SA 5082",
            name: "Vipul",
            phone: "0412345678",
            createdAt: "2021-10-06 02:10:57",
            UserId: 1
        },
        {
            location: "186 Archer St, North Adelaide SA 5006",
            name: "Param",
            phone: "0423456789",
            createdAt: "2021-10-04 02:10:57",
            UserId: 2
        },
        {
            location: "31 D'Erlanger Ave, Collinswood SA 5081",
            name: "Edward",
            phone: "0434567890",
            createdAt: "2021-10-05 02:10:57",
            UserId: 3
        },
        {
            location: "186 Archer St, North Adelaide SA 5006",
            name: "Edward",
            phone: "0434567890",
            createdAt: "2021-10-06 02:10:57",
            UserId: 3
        },
        {
            location: "6 Prospect Rd, Fitzroy SA 5082",
            name: "Isaac",
            phone: "0445678901",
            createdAt: "2021-10-06 02:10:57",
            UserId: 4
        },
        {
            location: "186 Archer St, North Adelaide SA 5006",
            name: "Suliman",
            phone: "0456789012",
            createdAt: "2021-10-06 02:10:57",
            UserId: 5
        },
        {
            location: "2A Percy St, Prospect SA 5082",
            name: "Param",
            phone: "0423456789",
            createdAt: "2021-10-05 02:10:57",
            UserId: 2
        },
        {
            location: "6 Prospect Rd, Fitzroy SA 5082",
            name: "Bob",
            phone: "0445678900",
            createdAt: "2021-10-06 02:10:57",
            UserId: null
        },
        {
            location: "154-160 Prospect Rd, Prospect SA 5082",
            name: "Isaac",
            phone: "0445678901",
            createdAt: "2021-10-06 02:10:57",
            UserId: 4
        },
        {
            location: "186 Archer St, North Adelaide SA 5006",
            name: "Bob",
            phone: "0445678900",
            createdAt: "2021-10-07 06:25:19",
            UserId: null
        },
        {
            location: "6 Prospect Rd, Fitzroy SA 5082",
            name: "Isaac",
            phone: "0445678901",
            createdAt: "2021-10-07 06:25:19",
            UserId: 4
        },
        {
            location: "186 Archer St, North Adelaide SA 5006",
            name: "Vipul",
            phone: "0412345678",
            createdAt: "2021-10-07 06:25:19",
            UserId: 1
        }
    ];

    initiateData = () => {
        let entries = [];

        //See if there are any roles currently in the database
        db.Role.findAll().then(data => {
            //Get the name from the data entries and place into an array
            data.forEach(entry => {
                entries.push(entry.name);
            });

            //Checks if the data already exist in the database
            if(entries.length === ROLES.length) {
                console.log("Data already initialised.");
                return;
            } 

            //If not create them.
            ROLES.forEach(role => {
                db.Role.create(role);
            });

            USERS.forEach(user => {
                db.User.create(user);
            });

            PUBLIC.forEach(public => {
                db.Public.create(public);
            });

            ADMIN.forEach(admin => {
                db.Admin.create(admin);
            });

            BUSINESS.forEach(business => {
                db.Business.create(business);
            });

            TRACER.forEach(tracer => {
                db.Tracer.create(tracer);
            });

            TERMINALS.forEach(user => {
                db.Terminal.create(user);
            });

            CHECKINS.forEach(checkin => {
                db.CheckIn.create(checkin);
            });

        }).catch(err => {
            console.log(err);
        }); 
    }
}