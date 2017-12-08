const data = [];
const uuid = ['a','b','c','d','e','f','0','1','2','8','9'];
const number = [8,4,4,4,12];

const uuidGenerator = {

    getRandomChar: function () {
        let random = Math.round(Math.random() * (uuid.length - 1));
        return uuid[random];
    },

    generateRandomString: function (number) {
        let id = '';
        for (let i = 1; i <= number; i++) {
            let char = this.getRandomChar();
            id += char;
        }
        return id;
    },

    createUuid: function () {
        let id = ''
        for (let i = 0; i < number.length; i++) {
            id += this.generateRandomString(number[i]);
            if ((i + 1) != number.length)
                id += '-';
        }

        return id;
    },
}

module.exports = uuidGenerator;
