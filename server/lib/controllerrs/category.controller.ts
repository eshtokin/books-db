import { Request, Response } from 'express'
import CategoriService from './../services/category.service';

const categoryService = new CategoriService();

export class CategoryController {
  public getAllCategory(req: Request, res: Response) {
    categoryService.getAllCategory(req)
    .then(value => {
      res.send(value)
    })
    .catch(err => {
      res.send(err)
    });
  }

  public addCategory(req: Request, res: Response) {
    categoryService.addCategory(req)
    .then(value => {
      if (value) {
        return res.status(400).send({
          message: 'category already exist'
        })
      }
      return res.status(200).send({
        message: 'successful'
      })
    })
    .catch(err => {
      res.status(500).send({
        message: 'error on the server'
      })
    })
  }

  public deleteCategory(req: Request, res: Response) {
    categoryService.deleteCategory(req)
    .then(() => {
      return res.status(200).send({
        message: 'successfuly deleted'
      })
    })
    .catch(err => {
      return res.send(err)
    })
  }
}