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
  var session = driver.session();
  var myData = [];
  //MATCH (m:man)-[r:去过]->(t:thb) RETURN m, r, t
  return session
    .run("match (n:thb{thb_name:$nameParam}) return n", {
      nameParam: input,
    })
    .then((result) => {
      result.records.forEach((record) => {
        myData = record.get("n");
      });
    })
    .catch((error) => {})
    .then(() => {
      session.close();
      return myData;
    });
}

//获取人和老字号关系数据
function getManLhb(input) {
  var session = driver.session();
  var myData = [];
  return session
    .run("MATCH (m:man)-[r:去过]->(t:thb) RETURN m, r, t", {})
    .then((result) => {
      result.records.forEach((record) => {
        let node = {
          start: record.get("m"),
          real: record.get("r"),
          end: record.get("t"),
        };
        myData.push(node);
      });
    })
    .catch((error) => {})
    .then(() => {
      session.close();

      return myData;
    });
}

//获取人和胡同关系数据
function getManHt(input) {
  var session = driver.session();
  var myData = [];
  return session
    .run("MATCH (m:man)-[r:去过]->(h:hb) RETURN m, r, h", {})
    .then((result) => {
      result.records.forEach((record) => {
        let node = {
          start: record.get("m"),
          real: record.get("r"),
          end: record.get("h"),
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
      result.records.forEach((record) => {
        myData.push(record.get("n").properties);
      });
    })
    .catch((error) => {})
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
      result.records.forEach((record) => {
        let count = {
          lng: record.get("n").properties.long * 1,
          lat: record.get("n").properties.lat * 1,
          count: record.get("n").properties.value * 1,
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
  var session = driver.session();
  var nodes = [];
  var edges = [];

  return session
    .run("MATCH (m:man)-[r:相关]->(n:man) RETURN m, r, n")
    .then((result) => {
      result.records.forEach((record) => {
        edges.push({
          source: record.get("r").start.low + "",
          target: record.get("r").end.low + "",
          properties: record.get("r").properties,
        });
        nodes.push(record.get("m"));
        nodes.push(record.get("n"));
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      let myData = { nodes: quchong(nodes), edges: edges };
      return myData;
    });
}

//查询整个数据库
function getAll(){
  var session = driver.session();
  var nodes = [];
  var edges = [];
  return session
    .run("MATCH (m)-[r]-(n) RETURN m,r,n")
    .then((result) => {
      
      result.records.forEach((record) => {
        edges.push({
          source: record.get("r").start.low + "",
          target: record.get("r").end.low + "",
          properties: record.get("r").properties,
        });
        nodes.push({
          id:record.get("m").identity.low+ "",
          labels:record.get("m").labels[0],
          properties:record.get("m").properties
        }
          );
        nodes.push({
          id:record.get("n").identity.low+ "",
          labels:record.get("n").labels[0],
          properties:record.get("n").properties
        });
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      let myData = { nodes: quchongAll(nodes), edges: edges };
      return myData;
    });
}

//查询整个数据库
function getMan(){
  var session = driver.session();
  var nodes = [];
  var edges = [];
  return session
    .run("MATCH (m:man)-[r]-(n:man) RETURN m,r,n")
    .then((result) => {
      
      result.records.forEach((record) => {
        edges.push({
          source: record.get("r").start.low + "",
          target: record.get("r").end.low + "",
          properties: record.get("r").properties,
        });
        nodes.push({
          id:record.get("m").identity.low+ "",
          labels:record.get("m").labels[0],
          properties:record.get("m").properties
        }
          );
        nodes.push({
          id:record.get("n").identity.low+ "",
          labels:record.get("n").labels[0],
          properties:record.get("n").properties
        });
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      let myData = { nodes: quchongAll(nodes), edges: edges };
      return myData;
    });
}

//去重数据-All
function quchongAll(arr) {
  const res = new Map();
  return arr.filter(
    (a) => !res.has(a.id) && res.set(a.id, 1)
  );
}

//去重数据
function quchong(arr) {
  const res = new Map();
  return arr.filter(
    (a) => !res.has(a.identity.low) && res.set(a.identity.low, 1)
  );
}

//查询基础信息
function getInfo(type){
  var session = driver.session();
  var myData={
    type:type,
    data:[]
  }
  var nodes = [];
  var edges = [];
  return session
    .run(`MATCH (m:${type}) RETURN m`)
    .then((result) => {
      result.records.forEach((record) => {
        myData.data.push(record.get("m"));
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close();
      // let myData = { nodes: quchongAll(nodes), edges: edges };
      return myData;
    });
}


export {
  getCenter,
  getSpace,
  getManLhb,
  getHeat,
  getHeatAll,
  getPerson,
  getManPlace,
  getAll,
  getInfo,
  getMan,
};
