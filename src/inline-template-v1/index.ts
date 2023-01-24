const fs = require("fs").promises;
const jsreport = require("@jsreport/jsreport-core")();
jsreport.use(require("@jsreport/jsreport-chrome-pdf")());
jsreport.use(require("@jsreport/jsreport-handlebars")());

const getReport = async () => {
  await jsreport
      .init()
      .then(() => {
      console.log("jsreport server started");
  })
      .catch((e:any) => {
      console.error(e);
  });
  const result = await jsreport.render({
    template: {
		content: '<h1>Hello {{foo}}</h1>',
		engine: 'handlebars',
		recipe: 'chrome-pdf'
	},
	data: {
		foo: "world"
	}
  });
  await fs.writeFile('out.pdf', result.content)
};
getReport();
