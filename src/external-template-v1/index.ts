const getForTemplateReport = async () => {
  const fs = require("fs").promises;
  const jsreport = require("@jsreport/jsreport-core")();
  jsreport.use(require("@jsreport/jsreport-chrome-pdf")());
  jsreport.use(require("@jsreport/jsreport-handlebars")());

  jsreport.serverUrl = "http://localhost:5488/";
  await jsreport
    .init()
    .then(() => {
      console.log("jsreport server started");
    })
    .catch((e: any) => {
      console.error(e);
    });
  const result = await jsreport.render({
    template: {
      name: "Orders",
    },
    data: {},
  });
  await fs.writeFile("out.pdf", result.content);
};
getForTemplateReport();
