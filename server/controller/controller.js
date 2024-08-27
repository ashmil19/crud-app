import crudModel from '../model/model.js'

const getAll = async (req, res)=>{
    res.json({message: "getAll"})
}

const create = async (req, res)=>{
    console.log(req.body)
    res.json({ message: "create"})
}

const update = async (req, res)=>{
    res.json({message: "update"})
}

const remove = async (req, res)=>{
    res.json({message: "delete"})
}


const controller = {
    create,
    getAll,
    update,
    remove
}

export default controller