// [
// { hash: 'choko7' }
// ]

// const string = JSON.stringify(result);
// const json = JSON.parse(string);
// const object1 = json;

const hash = [{ a: 'somestring', b: 42, c: false }, { a: 'とげぞう', b: 33, c: false }];

const map1 = hash.map(value => value.a);
console.log(map1)

// const a = Object.values(map1);
// console.log(a);

const name = 'とげぞう';

console.log(map1.includes(name));

/* const selectHash = 'select employee_id, hash from staff_lists';
con.query(selectHash, (err, result, fields) => {
  if (err) throw err;
  const hash = result;
  const map1 = hash.map(value => value.employee_id.toString());
  const map2 = hash.map(value => value.hash);
  // console.log(map1);
  // console.log(map2);
  passport.use(new LocalStrategy(
    function (username, password, done) {
      if (map1.includes(username) && map2.includes(password)) { // username,password紐付きはinputのname
        return done(null, username);
      }
      return done(null, false, {});
    }
  ));
}); */

/*
nput: (req, res, next) => {
  const password = req.body.password;
  const emproyeeId = req.body.username;
  const sql = 'select hash from staff_lists where employee_id = ?';
  con.query(sql, emproyeeId, function (err, result, fields) {
    // console.log(req.body.username);
    // console.log(password);
    if (err) throw err;
    const hashObj = result; // selectしたhash
    const hashArray = hashObj.map(value => value.hash);
    const hash = hashArray[0];
    console.log(hash);
    hashArray.forEach(value => { // 照合できるレベルに変換
      console.log(value);
      const hash = value;
      bcrypt.compareSync(password, hash); // hashと入力passを照合,trueかfalse
    });
    next();
  });
},
*/

/* input: (req, res, next) => {
  const password = req.body.password;
  const emproyeeId = req.body.username;
  const sql = 'select hash from staff_lists where employee_id = ?';
  con.query(sql, emproyeeId, function (err, result, fields) {
    if (err) throw err;
    const hashObj = result;
    const hashArray = hashObj.map(value => value.hash);
    const hash = hashArray[0];
    bcrypt.compareSync(password, hash); // hashと入力passを照合,trueかfalse
  });
  next();
}, */

// modelより個別処理を受け取り,経路別処理実行を記述
/*   new: (req, res) => {
    res.render('staffs/new');
  },
  create: (req, res, next) => {
    const pass = req.body.hash;
    const hash = bcrypt.hashSync(pass, saltRounds);
    req.body.hash = hash;
    const sql = 'insert into staff_lists set ?';
    con.query(sql, req.body, (error, results) => {
      if (error) {
        req.flash('error', '登録できませんでした');
        res.redirect('/staffs/new');
        next();
      } else {
        req.flash('success', '登録できました');
        res.redirect('/staffs/update');
      }
      // console.log(req.body);
      next();
    });
  }, */

/*
  const nameHash = 'select employee_id, hash from staff_lists where employee_id = ?';
    con.query(nameHash, username, (err, result, fields) => {
      if (err) throw err;
      const nameHash = result;
      const employeeid = nameHash.map(value => value.employee_id).toString();
      const password = nameHash.map(value => value.hash);
      // const eId = employeeid[0];
      // const pass = password[0];
      console.log(employeeid);
      console.log(password);

      if (username === employeeid && password == password) {
        return done(null, username);
      } else {
        console.log('Login Error');
        return done(null, false, { message: 'パスワードが正しくありません' });
      }
    }); */

/* input: (req, res, next) => {
      const password = req.body.password;
      const emproyeeId = req.body.username;
      const sql = 'select hash from staff_lists where employee_id = ?';
      con.query(sql, emproyeeId, function (err, result, fields) {
        if (err) throw err;
        const hashObj = result;
        const hashArray = hashObj.map(value => value.hash);
        const hash = hashArray[0];
        bcrypt.compareSync(password, hash); // hashと入力passを照合,trueかfalse
      });
      next(); */


    /*   validate: oneOf(
        [
          body('password')
            .trim() // 左右両側の空白を除去
          check('employee_id', '半角数字,6文字で必ず入力してください')
            .isInt()
            .isLength({
              min: 6,
              max: 6
            })
            .isEmpty(),
          check('hire_data', '必ず入力してください')
            .isEmpty(),
          check('staff_name', '必ず入力してください')
            .isEmpty(),
          check('password', 'パスワードを空にする事はできません')
            .isEmpty(),
          check('birthday', '必ず入力してください')
            .isEmpty(),
          check('genders_gender_id', '1~3の範囲で入力してください')
            .isInt()
            .isLength({
              min: 1,
              max: 1
            })]), */

            // vlidatorが吐き出した結果の中身(5.3.1)
            /* validate: (req, res, next) => {
              req.check('employee_id', '半角数字,6文字で必ず入力してください')
                .isInt()
                .isLength({
                  min: 5,
                  max: 6
                })
                .isEmpty();
              req.check('hire_data', '必ず入力してください')
                .isEmpty();
              req.check('staff_name', '必ず入力してください')
                .isEmpty();
              req.check('password', 'パスワードを空にする事はできません')
                .isEmpty();
              req.check('birthday', '必ず入力してください')
                .isEmpty();
              req.check('genders_gender_id', '1~3の範囲で入力してください')
                .isInt()
                .isLength({
                  min: 1,
                  max: 1
                });
              req.getValidationResult().then(error => {
                if (!error.isEmpty()) {
                  // console.log(error.isEmpty()); // true or false
                  // console.log(error.array()); // error結果のオブジェクト,オブジェクト,([{location: 'body',param: 'employee_id',msg: '半角数字,6文字で必ず入力してください'value: '537724737537'},......])
                  // console.log(error.mapped()); // error結果オブジェクト,オブジェクト,({{location: 'body',param: 'employee_id',msg: '半角数字,6文字で必ず入力してください'value: '537724737537'},......})
                  // console.log(error.formatWith()); // error全体の関数オブジェクト{isEmpty: [Function],array: [Function],mapped: [Function],formatWith: [Function],throw: [Function]}
                  // console.log(error.throw()); // errorを起こした時のerrorそのものの内容
                  // req.flash('error', messages);
                  // res.redirect('/');
                  next();
                }
              }); */
              