const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./chai-serve");

// Configure chai
chai.use(chaiHttp);
chai.should();

let app = null;

before((done) => {
	server.then((result) => {
		app = result;
		done();
	});
});

describe("Sanity Test", () => {
	describe("GET /admin/Project", () => {
		it("+ should return a list of projects", (done) => {
			chai.request(app)
				.get("/admin/Project")
				.auth("admin:admin")
				.end((error, response) => {
					try {
						response.should.have.status(200);
						response.body.value.should.be.an("array").to.have.lengthOf(3);
						done();
					} catch (error) {
						done(error);
					}
				});
		});
	});

	describe("GET /admin/Notifications", () => {
		it("+ should return notifications", (done) => {
			chai.request(app)
				.get("/admin/Notifications")
        .auth("admin:admin")
				.end((error, response) => {
					try {
						response.should.have.status(200);
						done();
					} catch (error) {
						done(error);
					}
				});
		});
	});
});
