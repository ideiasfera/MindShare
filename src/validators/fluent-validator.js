'use strict';

let errors = [];

function ValidationContract() {
    errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (value.length == 0) {
          errors.push({ message: message });
		}
	}
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (value.length < min) {
			errors.push({ message: message });
		}		
	}
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (value.length > max) {
			errors.push({ message: message });
		}		
	}
}

ValidationContract.prototype.hasMinMaxLen = (value, min, max, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if ((value.length < min) || (value.length > max)) {
			errors.push({ message: message });
		}		
	}
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (value.length != len) {
			errors.push({ message: message });
		}
	}
}

ValidationContract.prototype.isEmail = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
		if (!reg.test(value))
			errors.push({ message: message });
	}
}

ValidationContract.prototype.isCep = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		var reg = new RegExp(/^\d{5}-\d{3}$/);
		if (!reg.test(value))
			errors.push({ message: message });
	}
}

ValidationContract.prototype.isTelephone = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		var reg = new RegExp(/^[+][5][5][\s][(]\d{2}[)][\s]\d{5}[-]\d{4}$/);
		if (!reg.test(value))
			errors.push({ message: message });
	}
}

ValidationContract.prototype.isCPF = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		var reg = new RegExp(/^\d{3}[.]\d{3}[.]\d{3}[-]\d{2}$/);
		if (!reg.test(value))
			errors.push({ message: message });
	}
}

ValidationContract.prototype.isCNPJ = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		var reg = new RegExp(/^\d{2}[.]\d{3}[.]\d{3}[/]\d{4}[-]\d{2}$/);
		if (!reg.test(value))
			errors.push({ message: message });
	}
}

ValidationContract.prototype.isDate = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		var reg = new RegExp(/^[0-3]\d[/][0-1]\d[/][1-2][019]\d{2}$/);
		if (!reg.test(value))
			errors.push({ message: message });
	}
}

ValidationContract.prototype.isId = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (value.length == 0) {
          errors.push({ message: message });
		} else {
			if (value.length != 24) {
				errors.push({ message: message });
			} else {
				var reg = new RegExp(/^[a-z0-9]{24}$/);
				if (!reg.test(value)) {
					errors.push({ message: message });
				}
			}
		}
	}
}

ValidationContract.prototype.isGender = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
      if (typeof value !== "string") {
        errors.push({ message: message });
      } else {
        if ((value !== "Masculino") && (value !== "Feminino")) {
          errors.push({ message: message });
	    }
      }
    }
}

ValidationContract.prototype.isArray = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
      if (typeof value !== "string") {
        errors.push({ message: message });
      }
    }
}

ValidationContract.prototype.isString = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (typeof value !== "string") {
			errors.push({ message: message });
		}
    }
}

ValidationContract.prototype.isNumber = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (typeof value !== "number") {
			errors.push({ message: message });
		}
	}
}

ValidationContract.prototype.isMinNumber = (value, min,  message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (typeof value !== "number") {
			errors.push({ message: message });
		} else {
			if (Number(value) < min) {
				errors.push({ message: message });
			}
		}
	}
}

ValidationContract.prototype.isMaxNumber = (value, max,  message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (typeof value !== "number") {
			errors.push({ message: message });
		} else {
			if (Number(value) > max) {
				errors.push({ message: message });
			}
		}
	}
}

ValidationContract.prototype.isMinMaxNumber = (value, min, max, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (typeof value !== "number") {
			errors.push({ message: message });
		} else {
			if ((Number(value) < min) || (Number(value) > max)) {
				errors.push({ message: message });
			}
		}
	}
}

ValidationContract.prototype.isBoolean = (value, message) => {
    if ((value == null) || (value == undefined)) {
        errors.push({ message: message });
	} else {
		if (typeof value !== "boolean") {
			errors.push({ message: message });
		} else {
			if ((value !== true) && (value !== false)) {
				errors.push({ message: message });
			}
		}
	}
}

ValidationContract.prototype.isEqual = (value1, value2, message) => {
    if ((value1 == null) || (value1 == undefined)) {
        errors.push({ message: message });
	} else {
		if (value1 !== value2) {
			errors.push({ message: message });
		}
	}
}

ValidationContract.prototype.isEqualOr = (value1, value2, value3, message) => {
    if ((value1 == null) || (value1 == undefined)) {
        errors.push({ message: message });
	} else {
		if ((value1 !== value2) && (value1 !== value3)) {
			errors.push({ message: message });
		}
	}
}

ValidationContract.prototype.isEqualOrOr = (value1, value2, value3, value4, message) => {
    if ((value1 == null) || (value1 == undefined)) {
        errors.push({ message: message });
	} else {
		if ((value1 !== value2) && (value1 !== value3) && (value1 !== value4)) {
			errors.push({ message: message });
		}
	}
}

ValidationContract.prototype.errors = () => { 
    return errors; 
}

ValidationContract.prototype.clear = () => {
    errors = [];
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;