module.exports = class Validator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(obj) {
    const errors = [];

    //проверим, что правила влидны
    let ruleType = typeof this.rules;
    if (ruleType !== 'object') {
      errors.push({ object: 'type of rule', error: `expect object, got ${ruleType}` });
      return errors;
    }

    if (this.rules == null) {
      errors.push({ object: 'type of rule', error: `expect object, got null` });
      return errors;
    }

    //нужно бы еще проверить поля в объекте правил, но не успеваю уже 

    for (const field of Object.keys(this.rules)) {
      const rules = this.rules[field];

      const value = obj[field];
      const type = typeof value;

      //првоерям возможно правило есть, а в объекте нет такого поля

      if ( ! (field in obj) ) {
        continue;
      };
      
      //проверяем тип, если тип неверный дальше не идем 
      if (type !== rules.type) {
        errors.push({ field, error: `expect ${rules.type}, got ${type}` });
        return errors;
      };

      switch (type) {
        case 'string':

          

          if (value.length < rules.min) {
            errors.push({ field, error: `too short, expect ${rules.min}, got ${value.length}` });
          }
          if (value.length > rules.max) {
            errors.push({ field, error: `too long, expect ${rules.max}, got ${value.length}` });
          }
          break;

        case 'number':
          if (value < rules.min) {
            errors.push({ field, error: `too little, expect ${rules.min}, got ${value}` });
          }
          if (value > rules.max) {
            errors.push({ field, error: `too big, expect ${rules.min}, got ${value}` });
          }


          if (isNaN(value)) { //Добавим проверку на NaN
            errors.push({ field, error: `NaN is not allowed` });
          }

          break;
      }
    }

    return errors;
  }
};
