// import { Injectable } from '@angular/core';

// import { AppConstant } from './app-constant';
// import { AppInjector } from './app-injector';
// import { SchemaService } from 'ngx-universal-zone/database';
// import { DbService } from './db/db-base.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AppSettingService {
//   protected static settingCache = new Map();
//   protected dbService: DbService;
//   protected schemaSvc: SchemaService;

//   constructor() {
//     const injector = AppInjector.getInjector();

//     this.dbService = injector.get(DbWebService);
//     this.schemaSvc = injector.get(SchemaService);
//   }

//   putWorkingLanguage(lang: any) {
//     return this.dbService
//       .putLocal(this.schemaSvc.tables.setting, {
//         key: AppConstant.KEY_WORKING_LANGUAGE,
//         value: lang,
//       })
//       .then(() => {
//         AppSettingService.settingCache.set(
//           AppConstant.KEY_WORKING_LANGUAGE,
//           lang
//         );
//       });
//   }

//   getWorkingLanguage() {
//     return this.get<string>(AppConstant.KEY_WORKING_LANGUAGE);
//   }

//   get<T>(key: string): Promise<T> {
//     if (AppSettingService.settingCache.has(key)) {
//       return new Promise((resolve, reject) => {
//         let settingCacheMap = AppSettingService.settingCache.get(key);
//         resolve(settingCacheMap);
//       });
//     } else {
//       return this.dbService
//         .get<any>(this.schemaSvc.tables.setting, key)
//         .then((setting) => {
//           if (setting && setting.value) {
//             AppSettingService.settingCache.set(key, setting.value);
//             return setting.value;
//           }
//           return null;
//         });
//     }
//   }

//   put(key: string, values) {
//     return this.dbService
//       .putLocal(this.schemaSvc.tables.setting, {
//         key: key,
//         value: values,
//       })
//       .then(() => {
//         AppSettingService.settingCache.set(key, values);
//       });
//   }

//   remove(key: string) {
//     return this.dbService
//       .remove(this.schemaSvc.tables.setting, {
//         key: key,
//       })
//       .then(() => {
//         AppSettingService.settingCache.delete(key);
//       });
//   }

//   removeCache(key: string) {
//     AppSettingService.settingCache.delete(key);
//   }
// }
