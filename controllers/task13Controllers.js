const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));

const home = (req, res) => {
  res.render("./task13/home");
};

const updated = (req, res) => {
  const sql = `select eid from all_tasks0.task12_basic_details`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    const key = Object.keys(result[0]);

   console.log(result);
   res.render("./task13/updated" , {id : result});
  });

};;

const display = (req, res) => {
  res.render("./task13/index", { result: "false", key: "" });
};

const submit = (req, res) => {
  let {
    hidden,
    first_name,
    last_name,
    designation,
    email,
    addressline1,
    addressline2,
    state,
    city,
    zipcode,
    phonenumber,
    gender,
    relationship,
    dob,
  } = req.body;
  // console.log(hidden);
  if (hidden == "false") {
    console.log("in1");
    if (req.body.page == "basic") {
      let sql1 = `insert into task12_basic_details (fname,lname,add1,add2,city,state,zipcode,phone,designation,gender,relationshipstatus,dob,email) values ("${first_name}","${last_name}","${addressline1}","${addressline2}","${city}","${state}","${zipcode}","${phonenumber}","${designation}","${gender}","${relationship}","${dob}","${email}")`;
      console.log(sql1);
      con.query(sql1, function (err, result1) {
        if (err) throw err;
        console.log(result1.insertId);
        res.json(result1.insertId);
      });
    }
    let sql = ``;
    if (req.body.page === "education") {
      let id = req.body.id;
      // console.log(req.body);

      //delete

      sql = `delete from task12_education where eid = ${id}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const coursename = [req.body.course1, req.body.course2, req.body.course3];
      const passingyear = [req.body.year1, req.body.year2, req.body.year3];
      const percentage = [req.body.per1, req.body.per2, req.body.per3];
      if (req.body.course4 !== "") {
        coursename.push(req.body.course4);
        passingyear.push(req.body.year4);
        percentage.push(req.body.per4);
      }
      // console.log(coursename, percentage, passingyear);

      for (let i = 0; i < coursename.length; i++) {
        sql = `insert into task12_education (eid , coursename , passingyear , percentage) values (${id} , "${coursename[i]}" , ${passingyear[i]} , ${percentage[i]})`;

        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      console.log("Education details inserted successfully");
      return res.sendStatus(200);
    } else if (req.body.page === "work") {
      let id = req.body.id;

      //delete

      sql = `delete from task12_experience where eid = ${id}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const com = [req.body.cname1, req.body.cname2];
      const des = [req.body.des1, req.body.des2];
      const f = [req.body.from1, req.body.from2];
      const t = [req.body.to1, req.body.to2];

      const newcompnay = com.filter(function (el) {
        return el != "";
      });
      const newworkdesignation = des.filter(function (el) {
        return el != "";
      });
      const newfrom = f.filter(function (el) {
        return el != "";
      });
      const newto = t.filter(function (el) {
        return el != "";
      });

      // console.log(newcompnay, newworkdesignation, newfrom, newto);

      for (let i = 0; i < newcompnay.length; i++) {
        sql = `insert into task12_experience (eid , compnayname ,designation ,start , end) values (${id} , "${newcompnay[i]}" , "${newworkdesignation[i]}" , "${newfrom[i]}","${newto[i]}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      console.log("Work experience details inserted successfully");

      return res.sendStatus(200);
    } else if (req.body.page === "language") {
      let id = req.body.id;

      sql = `delete from task12_language where eid = ${id}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////

      // console.log(id);
      const lname = req.body.lname;
      const hindi = req.body.hindi;
      const english = req.body.english;
      const gujarati = req.body.gujarati;
      if (hindi.length > 0) {
        for (let i = 0; i < hindi.length; i++) {
          sql = `insert into task12_language (eid , languagename , type) values (${id} , "hindi", "${hindi[i]}")`;
          // console.log(sql);
          con.query(sql, function (err, result1) {
            if (err) throw err;
          });
        }
      }
      if (gujarati.length > 0) {
        for (let i = 0; i < gujarati.length; i++) {
          sql = `insert into task12_language (eid , languagename , type) values (${id} , "gujarati", "${gujarati[i]}")`;
          // console.log(sql);
          con.query(sql, function (err, result1) {
            if (err) throw err;
          });
        }
      }
      console.log("helllllllllllooooo",english , "hellooooooooooooo");
      if (english.length > 0) {
        for (let i = 0; i < english.length; i++) {
          sql = `insert into task12_language (eid , languagename , type) values (${id} , "english", "${english[i]}")`;
          // console.log(sql);
          con.query(sql, function (err, result1) {
            if (err) throw err;
          });
        }
      }
      console.log("Language details inserted successfully");

      return res.sendStatus(200);
    } else if (req.body.page === "technology") {
      let id = req.body.id;

      sql = `delete from task12_technology where eid = ${id}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const php = req.body.php;
      const mysql = req.body.mysql;
      const oracle = req.body.oracle;
      const laravel = req.body.laravel;
      let type;
      let index = php.indexOf(true);
      if (index == 0) {
        type = "Begainer";
      } else if (index == 1) {
        type = "Mediator";
      } else if (index == 2) {
        type = "Expert";
      }

      if (req.body.php.includes(true)) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${id} , "php", "${type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }

      //

      index = mysql.indexOf(true);
      if (index == 0) {
        type = "Begainer";
      } else if (index == 1) {
        type = "Mediator";
      } else if (index == 2) {
        type = "Expert";
      }

      if (req.body.mysql.includes(true)) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${id} , "mysql", "${type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }

      //

      index = laravel.indexOf(true);
      if (index == 0) {
        type = "Begainer";
      } else if (index == 1) {
        type = "Mediator";
      } else if (index == 2) {
        type = "Expert";
      }

      if (req.body.laravel.includes(true)) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${id} , "laravel", "${type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }

      //

      index = oracle.indexOf(true);
      if (index == 0) {
        type = "Begainer";
      } else if (index == 1) {
        type = "Mediator";
      } else if (index == 2) {
        type = "Expert";
      }

      if (req.body.oracle.includes(true)) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${id} , "oracle", "${type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      console.log("Technology details inserted successfully");

      return res.sendStatus(200);
    } else if (req.body.page === "reference") {
      let id = req.body.id;

      sql = `delete from task12_reference where eid = ${id}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const rr = [req.body.rr1, req.body.rr2];
      const rc = [req.body.rc1, req.body.rc2];
      const rn = [req.body.rn1, req.body.rn2];

      const newrr = rr.filter(function (el) {
        return el != "";
      });
      const newrc = rc.filter(function (el) {
        return el != "";
      });
      const newrn = rn.filter(function (el) {
        return el != "";
      });

      for (let i = 0; i < newrn.length; i++) {
        sql = `insert into task12_reference (eid , name ,contact ,relation) values (${id} , "${newrn[i]}" , ${newrc[i]} , "${newrr[i]}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      console.log("Reference details inserted successfully");

      return res.sendStatus(200);
    } else if (req.body.page === "preference") {
      let id = req.body.id;

      sql = `delete from task12_preference where eid = ${id}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const loca = req.body.location;
      const np = req.body.np;
      // console.log(loca);
      const ectc = req.body.ectc;
      const cc = req.body.cc;
      const dep = req.body.dep;

      for (let i = 0; i < loca.length; i++) {
        sql = `insert into task12_preference (eid,location,noticeperiod,expectedCTC,currentCTC,department) values (${id},"${loca[i]}", ${np}, ${ectc}, ${cc} , "${dep}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Preference details inserted successfully");
        });
      }

      return res.render("./task13/validate");
    }
  } else {
    if (req.body.page === "basic") {
      let finalid = req.body.id;

      let sql = `update task12_basic_details set fname = "${first_name}" , lname = "${last_name}" , add1 = "${addressline1}" , add2 = "${addressline2}" , city = "${city}" , state = "${state}" , zipcode = ${zipcode} , phone = ${phonenumber} , designation = "${designation}" , gender = "${gender}" , relationshipstatus = "${relationship}" , dob = "${dob}" , email = "${email}" where eid = ${finalid} `;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });
      return res.sendStatus(200);
    } else if (req.body.page === "education") {
      let finalid = req.body.id;

      sql = `delete from task12_education where eid = ${finalid}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const coursename = [req.body.course1, req.body.course2, req.body.course3];
      const passingyear = [req.body.year1, req.body.year2, req.body.year3];
      const percentage = [req.body.per1, req.body.per2, req.body.per3];
      if (req.body.course4 !== "") {
        coursename.push(req.body.course4);
        passingyear.push(req.body.year4);
        percentage.push(req.body.per4);
      }
      // console.log(coursename, percentage, passingyear);

      for (let i = 0; i < coursename.length; i++) {
        sql = `insert into task12_education (eid , coursename , passingyear , percentage) values (${finalid} , "${coursename[i]}" , ${passingyear[i]} , ${percentage[i]})`;

        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      return res.sendStatus(200);
    } else if (req.body.page === "work") {
      let finalid = req.body.id;

      sql = `delete from task12_experience where eid = ${finalid}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const com = [req.body.cname1, req.body.cname2];
      const des = [req.body.des1, req.body.des2];
      const f = [req.body.from1, req.body.from2];
      const t = [req.body.to1, req.body.to2];

      const newcompnay = com.filter(function (el) {
        return el != "";
      });
      const newworkdesignation = des.filter(function (el) {
        return el != "";
      });
      const newfrom = f.filter(function (el) {
        return el != "";
      });
      const newto = t.filter(function (el) {
        return el != "";
      });

      for (let i = 0; i < newcompnay.length; i++) {
        sql = `insert into task12_experience (eid , compnayname ,designation ,start , end) values (${finalid} , "${newcompnay[i]}" , "${newworkdesignation[i]}" , "${newfrom[i]}","${newto[i]}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }

      return res.sendStatus(200);
    } else if (req.body.page === "language") {
      let finalid = req.body.id;

      sql = `delete from task12_language where eid = ${finalid}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////

      // console.log(id);
      const lname = req.body.lname;
      const hindi = req.body.hindi;
      const english = req.body.english;
      const gujarati = req.body.gujarati;
      if (hindi.length > 0) {
        for (let i = 0; i < hindi.length; i++) {
          sql = `insert into task12_language (eid , languagename , type) values (${finalid} , "hindi", "${hindi[i]}")`;
          // console.log(sql);
          con.query(sql, function (err, result1) {
            if (err) throw err;
          });
        }
      }
      if (gujarati.length > 0) {
        for (let i = 0; i < gujarati.length; i++) {
          sql = `insert into task12_language (eid , languagename , type) values (${finalid} , "gujarati", "${gujarati[i]}")`;
          // console.log(sql);
          con.query(sql, function (err, result1) {
            if (err) throw err;
          });
        }
      }
      console.log("hello" , english);
      if (english.length > 0) {
        for (let i = 0; i < english.length; i++) {
          sql = `insert into task12_language (eid , languagename , type) values (${finalid} , "english", "${english[i]}")`;
          // console.log(sql);
          con.query(sql, function (err, result1) {
            if (err) throw err;
          });
        }
      }
      return res.sendStatus(200);
    } else if (req.body.page === "technology") {
      let finalid = req.body.id;

      sql = `delete from task12_technology where eid = ${finalid}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const php = req.body.php;
      const mysql = req.body.mysql;
      const oracle = req.body.oracle;
      const laravel = req.body.laravel;
      let type;
      let index = php.indexOf(true);
      if (index == 0) {
        type = "Begainer";
      } else if (index == 1) {
        type = "Mediator";
      } else if (index == 2) {
        type = "Expert";
      }

      if (req.body.php.includes(true)) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${finalid} , "php", "${type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }

      //

      index = mysql.indexOf(true);
      if (index == 0) {
        type = "Begainer";
      } else if (index == 1) {
        type = "Mediator";
      } else if (index == 2) {
        type = "Expert";
      }

      if (req.body.mysql.includes(true)) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${finalid} , "mysql", "${type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }

      //

      index = laravel.indexOf(true);
      if (index == 0) {
        type = "Begainer";
      } else if (index == 1) {
        type = "Mediator";
      } else if (index == 2) {
        type = "Expert";
      }

      if (req.body.laravel.includes(true)) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${finalid} , "laravel", "${type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      //
      index = oracle.indexOf(true);
      if (index == 0) {
        type = "Begainer";
      } else if (index == 1) {
        type = "Mediator";
      } else if (index == 2) {
        type = "Expert";
      }

      if (req.body.oracle.includes(true)) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${finalid} , "oracle", "${type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      return res.sendStatus(200);
    } else if (req.body.page === "reference") {
      let finalid = req.body.id;

      sql = `delete from task12_reference where eid = ${finalid}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const rr = [req.body.rr1, req.body.rr2];
      const rc = [req.body.rc1, req.body.rc2];
      const rn = [req.body.rn1, req.body.rn2];

      const newrr = rr.filter(function (el) {
        return el != "";
      });
      const newrc = rc.filter(function (el) {
        return el != "";
      });
      const newrn = rn.filter(function (el) {
        return el != "";
      });

      for (let i = 0; i < newrn.length; i++) {
        sql = `insert into task12_reference (eid , name ,contact ,relation) values (${finalid} , "${newrn[i]}" , ${newrc[i]} , "${newrr[i]}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      return res.sendStatus(200);
    } else if (req.body.page === "preference") {
      let finalid = req.body.id;

      sql = `delete from task12_preference where eid = ${finalid}`;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      /////////////////////////////////////////
      const loca = req.body.location;
      const np = req.body.np;
      const ectc = req.body.ectc;
      const cc = req.body.cc;
      const dep = req.body.dep;

      for (let i = 0; i < loca.length; i++) {
        sql = `insert into task12_preference (eid,location,noticeperiod,expectedCTC,currentCTC,department) values (${finalid},"${loca[i]}", ${np}, ${ectc}, ${cc} , "${dep}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
      console.log("object");
      return res.send({ msg: "Data inserted successfully" });
      // return res.render("./task13/validate");
    }
  }
  // res.render("validate");
};

const update = (req, res) => {
  const id = req.params.id;
  const sql = `select * from task12_basic_details where eid = ${id} ; select * from task12_education where eid = ${id} ; select * from task12_experience where eid = ${id} ; select * from task12_language where eid = ${id} ; select * from task12_technology where eid = ${id} ; select * from task12_reference where eid = ${id} ; select * from task12_preference where eid = ${id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    const key = Object.keys(result[0]);
    // console.log(result);
    console.log(result[4]);

    res.render("./task13/index", { result, key, id });
  });
};

const validate = (req, res) => {
  res.render("./task13/validate");
};

module.exports = {
  display,
  submit,
  update,
  validate,
  home,
  updated,
};
