const getProductMovements = require("../fns/get-product-movements")
const modelInventory = require("../model/inventory")
const inventoryMovement = require("./inventoryMovement")

class ServiceInventory {
    async FindById(organizationId, id, transaction){
        const inventory = await modelInventory.findOne(
            { where: { organizationId, id }},
            { transaction }
        )

        if(!inventory) {
            throw new Error("Estoque não encontrado")
        }

        const movements = await inventoryMovement.FindAll(inventory.id)

        const result = getProductMovements(movements)

        return { ...inventory.dataValues, ...result }
    }

    async FindAll(organizationId, transaction){
        return modelInventory.findAll(
            { where: { organizationId }},
            { transaction }
        )
    }

    async Create(organizationId, name, transaction){
        if(!organizationId) {
            throw new Error('Favor informar o campo organizationId')
        } else if(!name) {
            throw new Error('Favor informar o campo nome')
        }

        return modelInventory.create(
            { organizationId, name },
            { transaction }
        )
    }

    async Update(organizationId, id, name, transaction){
        const oldInventory = await modelInventory.findOne(
            { where: { organizationId, id }},
            { transaction }
        )

        if(!oldInventory) {
            throw new Error("Estoque não foi encontrado")
        }
        oldInventory.name = name || oldInventory.name

        return oldInventory.save({ transaction })
    }

    async Delete(organizationId, id, transaction){
        const oldInventory = await modelInventory.findOne(
            { where: { organizationId, id }},
            { transaction }
        )

        if(!oldInventory) {
            throw new Error("Estoque não foi encontrado")
        }

        await oldInventory.destroy({ transaction })
    }

}

module.exports = new ServiceInventory()