import { Request, Response } from "express"
import { connection } from "../data/connection"


export default async function selectAllStaff():Promise<any> {
    const result = await connection.raw(`
       SELECT id, name, email, type
       FROM aula48_exercicio;
    `)

    return result[0]

 }

export const getStaffByType = async(req: Request,res: Response): Promise<void> =>{
    try {
       const staff = await selectAllStaff()

       const type = req.params.type

       if(!staff.length){
          res.statusCode = 404
          throw new Error("No type found")
       }

       if(type === '') {
        throw new Error("Tipo é obrigatório!")
      }

      const result = await connection("aula48_exercicio")
      .where("type", "like", `%${type}%`)

      const resultee = result.map(toLabenuStaff)

       res.status(200).send(resultee)

    } catch (error:any) {
       console.log(error)
       res.send(error.message || error.sqlMessage)
    }
 }

 const toLabenuStaff = (input: any) => {
    return {
       id: input.id,
       name: input.name,
       email: input.email,
       type: input.type,
    }
 } 

