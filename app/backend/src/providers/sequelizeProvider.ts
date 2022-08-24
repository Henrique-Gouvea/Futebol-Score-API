// import { Model } from 'sequelize/types';
// import { IDB } from '../interfaces/Providers/IDB';
// import HandleError from '../interfaces/Error/handleError';

// class sequelizeProvider implements IDB <Model> {
//   async getAll(model:Model) : Promise<Model[]> {
//     console.log(this.getAll);

//     const response: Model[] = await model.findAll();
//     return response;
//   }

//   async getById(model:Model, id: number): Promise<Model> {
//     console.log(this.getAll);

//     const response = await model.findOne({ where: { id } });
//     if (!response) throw new HandleError('NotFound', 'Not Found');
//     return response;
//   }
// }

// export default sequelizeProvider;
