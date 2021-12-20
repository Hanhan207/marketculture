//Neo4j 接口
import neo4j from "neo4j-driver";

//初始化Neo4j数据库
var driver = neo4j.driver(
  // "neo4j://localhost:7687",
  "neo4j://152.136.131.13:7687",
  neo4j.auth.basic("neo4j", "sjwh")
);

//获取单个点
function getCenter(input) {
  console.log("Ineo4jInput", input);
  var session = driver.session();
  var myData = [];
  //MATCH (m:man)-[r:去过]->(t:thb) RETURN m, r, t
  return session
    .run("match (n:thb{thb_name:$nameParam}) return n", {
      nameParam: input,
    })
    .then((result) => {
      console.log("result", result);
      console.log("result.record", result.records[0].get(0));
      result.records.forEach((record) => {
        myData = record.get("n");
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      return myData;
    });
}

//获取人和老字号关系数据
function getManLhb(input) {
  // console.log("Ineo4jInput", input);
  var session = driver.session();
  var myData = [];
  return session
    .run("MATCH (m:man)-[r:去过]->(t:thb) RETURN m, r, t", {})
    .then((result) => {
      // console.log("result", result);
      // console.log("result.record", result.records[0].get(1));
      result.records.forEach((record) => {
        // console.log("eachRecord", record);
        let node = {
          start: record.get("m"),
          real: record.get("r"),
          end: record.get("t"),
        };
        myData.push(node);
        // console.log("myData", myData);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      console.log("mydata", myData);
      return myData;
    });
}

//获取人和胡同关系数据
function getManHt(input) {
  // console.log("Ineo4jInput", input);
  var session = driver.session();
  var myData = [];
  return session
    .run("MATCH (m:man)-[r:去过]->(h:hb) RETURN m, r, h", {})
    .then((result) => {
      // console.log("result", result);
      // console.log("result.record", result.records[0].get(1));
      result.records.forEach((record) => {
        // console.log("eachRecord", record);
        let node = {
          start: record.get("m"),
          real: record.get("r"),
          end: record.get("h"),
        };
        myData.push(node);
        // console.log("myData", myData);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      console.log("mydata", myData);
      return myData;
    });
}

//获取人和地点关系
function getManPlace(man, place) {
  var session = driver.session();
  var myData = [];
  return session
    .run(`MATCH (m:man{name:"${man}"})-[r]->(p:${place}) RETURN m, r, p`, {})
    .then((result) => {
      result.records.forEach((record) => {
        let node = {
          start: record.get("m"),
          real: record.get("r"),
          end: record.get("p"),
        };
        myData.push(node);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      return myData;
    });
}

//获取地图空间数据
function getSpace(input) {
  var session = driver.session();
  var myData = [];
  return session
    .run(`match (n:${input}) return n`)
    .then((result) => {
      console.log("result", result);
      result.records.forEach((record) => {
        // console.log("recordN", record.get("n"));
        // console.log("myData", myData);
        myData.push(record.get("n").properties);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      return myData;
    });
}

//获取热力数据
function getHeat(input) {
  var session = driver.session();
  var myData = [];
  return session
    .run(`match(n:${input}) return n`)
    .then((result) => {
      console.log("result", result);
      result.records.forEach((record) => {
        let count = {
          lng: record.get("n").properties.long,
          lat: record.get("n").properties.lat,
          count: record.get("n").properties.value,
        };
        myData.push(count);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      return myData;
    });
}

function getHeatAll() {
  var session = driver.session();
  var myData = [];
  return session
    .run(
      `
    match(n1:thb) (n2:ht)
     return n1,n2`
    )
    .then((result) => {
      console.log("resultAll", result);
      result.records.forEach((record) => {
        let count = {
          lng: record.get("n1").properties.long,
          lat: record.get("n1").properties.lat,
          count: record.get("n1").properties.value,
        };
        myData.push(count);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      return myData;
    });
}

//获取人物关系
function getPerson() {
  // console.log("Ineo4jInput", input);
  var session = driver.session();
  var nodes = [];
  var edges = [];

  //
  return session
    .run("MATCH (m:man)-[r:相关]->(n:man) RETURN m, r, n")
    .then((result) => {
      // console.log("result", result);
      // console.log("result.record", result.records[0].get(1));
      result.records.forEach((record) => {
        // console.log("eachRecord", record);
        edges.push({
          source: record.get("r").start.low + "",
          target: record.get("r").end.low + "",
          properties: record.get("r").properties,
        });
        nodes.push(record.get("m"));
        nodes.push(record.get("n"));

        // console.log("myData", myData);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      console.log("Nodes", nodes);
      let myData = { nodes: quchong(nodes), edges: edges };

      console.log("QC", quchong(nodes));
      return myData;
    });
}

//去重数据
function quchong(arr) {
  const res = new Map();
  // return arr.filter((a) => !res.has(a.id) && res.set(a.id, 1));
  return arr.filter(
    (a) => !res.has(a.identity.low) && res.set(a.identity.low, 1)
  );

  // const age = "id";
  // const r = arr.reduce(
  //   (all, next) =>
  //     all.some((atom) => atom[age] === next[age]) ? all : [...all, next],
  //   []
  // );
  // // console.log(r);
  // return r;
}

export {
  getCenter,
  getSpace,
  getManLhb,
  getHeat,
  getHeatAll,
  getPerson,
  getManPlace,
};
