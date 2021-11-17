const fs = require('fs')
const path = require('path')

const fetchAll = () => {
	try {
		let data = fs.readFileSync(path.join(process.cwd(), 'database', 'income.json'))
		return data
	} catch( error ) {
		return error
	}
}

const insert = (income) => {
	try {
		const { purpose, cost } = income
		let data = fs.readFileSync(path.join(process.cwd(), 'database', 'income.json'), 'UTF-8')
		let newIncome
		if(!data) {
			data = []
			newIncome = { id: 1, purpose, cost, date: new Date() }
		} else {
			data = JSON.parse(data)
			let id = data.length ? data[data.length - 1].id + 1 : 1
			newIncome = { id: id, purpose, cost, date: new Date() }
		}
		data.push(newIncome)
		fs.writeFileSync(path.join(process.cwd(), 'database', 'income.json'), JSON.stringify(data, null, 4))
		return newIncome
	} catch(error) {
		throw error
	}
}


const del = (obj) => {
	try {
		let { id } = obj
		let data = fs.readFileSync(path.join(process.cwd(), 'database', 'income.json'), 'UTF-8')
		if(data) {
			data = JSON.parse(data)
			let filtered = data.filter( el => el.id != id)
			if(filtered.length < data.length) {
				fs.writeFileSync(path.join(process.cwd(), 'database', 'income.json'), JSON.stringify(filtered, null, 4))
				return filtered
			} else {
				throw 'There is an error in deleting the element!'
			}
		} else throw 'The database is empty!'
	} catch(error) {
		throw error
	}
}

module.exports = {
	fetchAll,
	insert,
	del
}
