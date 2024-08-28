import crudModel from '../model/model.js'

const getAll = async (req, res)=>{
    try {
        const contents = await crudModel.find()
        res.status(200).json({contents})
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res)=>{
    try {
        const { content } = req.body
        const newContent = crudModel({
            content
        })
        await newContent.save()
        res.status(201).json({ message: "content successfully added"})
    } catch (error) {
        console.log(error)
    }
}

const update = async (req, res)=>{
    try {
        const { id } = req.params
        const { content } = req.body
        const updatedContent = await crudModel.findByIdAndUpdate(id, {content},{new: true})
        if(!updatedContent) return res.status(404).json({message: "content not found"})
        res.status(200).json({message: "success"})
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req, res)=>{
    try {
        const { id } = req.params
        const content = await crudModel.findByIdAndDelete(id);
        if(!content) return res.status(404).json({message: "content not found"})
        res.status(204).send()
    } catch (error) {
        console.log(error)
    }
}


const controller = {
    create,
    getAll,
    update,
    remove
}

export default controller