const Validator = require('../Validator');
const expect = require('chai').expect;
const sinon = require('sinon');



describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {

    describe('Проверяем name', () => {

      const rules_name = {
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      };

      function name_lenth() {

        const validator = new Validator(rules_name);

        let errors = validator.validate({ 
          name: '0123456789_0123456789' 
        }); // короче минимальной длины

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too long, expect 20, got 21');


        errors = validator.validate({ 
          name: '1234' 
        }); // Длинее максимальной длины

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 4');


        errors = validator.validate({ 
          name: '123456789012345' 
        }); // Привильная длина

        expect(errors).to.have.length(0); // все верно - массив должен быть пустым
      
        errors = validator.validate({ 
          name: '' 
        }); //Пустая строка

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 0');

      };

      function name_type() {

        const validator = new Validator(rules_name);

        let errors = validator.validate({ 
          name: null 
        }); // null

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got object');


        errors = validator.validate({ 
          name: 123 
        }); // null

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got number')

      };

      it('Тип данных name', name_type) //ОК
      it('Длина строки name', name_lenth); //ОК

    });

    describe('Проверям age', () => {

      const rules_age = {

        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      };

      function age_lenth() {

        const validator = new Validator(rules_age);

        let errors = validator.validate({ 
          age: 10 
        }); // меньше минимума

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too little, expect 18, got 10');

        errors = validator.validate({ 
          age: -10 
        }); // меньше минимума

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too little, expect 18, got -10');

        errors = validator.validate({ 
          age: Infinity 
        }); // больше максимума

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too big, expect 18, got Infinity');


        errors = validator.validate({ 
          age: 19 
        }); // Нормальный возраст

        expect(errors).to.have.length(0);
       
        errors = validator.validate({ 
          age: NaN 
        }); // этот кейс на отрабатывался! добавили 

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('NaN is not allowed');


      };

      function age_type() {

        const validator = new Validator(rules_age);

        let errors = validator.validate({ 
          age: '10' 
        }); 

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string');

        errors = validator.validate({ 
          age: undefined 
        }); 

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got undefined');

      };

      it('Тип age', age_type); //ОК

      it('Значение age', age_lenth); //ОК 

    });

    describe('Проверям объект с двумя параметрами', () =>{
      
      const rules_nameAge = {
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      };

      function nameAge(){
        const validator = new Validator(rules_nameAge);

        let errors = validator.validate({ 
          name: '12345678901',
          age: 19 
        }); 

        expect(errors).to.have.length(0);

        errors = validator.validate({ 
          name: '123',
          age: 13 
        }); 

        expect(errors).to.have.length(2);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 3');
        expect(errors[1]).to.have.property('field').and.to.be.equal('age');
        expect(errors[1]).to.have.property('error').and.to.be.equal('too little, expect 18, got 13');

      };

      function nameAge_onlyOne (){

        let validator = new Validator(rules_nameAge);

        let tObj = { 
          age: 19 
        };
        let errors = validator.validate(tObj); 
        
        expect(errors).to.have.length(0); // не должно быть ошибок 

        validator = new Validator(rules_nameAge);

        tObj = { 
          name: '12345678901' 
        };
        errors = validator.validate(tObj); 
        
        expect(errors).to.have.length(0); // не должно быть ошибок 
        
      };


      it('Имя и возраст правильный вариант и два нарушения', nameAge); // ОК
      it('Правила общие, но передали только имя или возраст - лишнее правило игнорировать', nameAge_onlyOne)

    });

    describe('Проверям что есть проверка на то, что объект правил и проверямый объект соотв. ожидаемым', () => {

      function check_rule() {
        
        let rules = undefined;
        let validator = new Validator(rules);
        let errors = validator.validate({});

        expect(errors).to.have.length(1); // должна быть одна ошибка
        expect(errors[0]).to.have.property('object').and.to.be.equal('type of rule');
        expect(errors[0]).to.have.property('error').and.to.be.equal(`expect object, got ${typeof rules}`);

        rules = NaN;
        validator = new Validator(rules);
        errors = validator.validate({});

        expect(errors).to.have.length(1); // должна быть одна ошибка
        expect(errors[0]).to.have.property('object').and.to.be.equal('type of rule');
        expect(errors[0]).to.have.property('error').and.to.be.equal(`expect object, got ${typeof rules}`);

        rules = null;
        validator = new Validator(rules);
        errors = validator.validate({});

        expect(errors).to.have.length(1); // должна быть одна ошибка
        expect(errors[0]).to.have.property('object').and.to.be.equal('type of rule');
        expect(errors[0]).to.have.property('error').and.to.be.equal(`expect object, got null`);


      };

      it('Объект правил - должен быть объект', check_rule); // ОК - предвариательно

    })


  });
});


