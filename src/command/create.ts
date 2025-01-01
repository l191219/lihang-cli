import {input,select} from "@inquirer/prompts";
import path from "path"
import fs from "fs-extra"
import { clone } from "../utils/clone";
export interface TemplateInfo{
    name:string; // 模版名称
    downloadUrl:string, // 模版下载地址
    description:string //模版描述
    branch:string //模版分支
}
export const templates:Map<string,TemplateInfo> = new Map(
    [
       ["Vite-Vue3-TypeScript-template",{
        name:"Vue-Vue3-TypeScript-template",
        downloadUrl:"git@gitee.com:sohucw/admin-pro.git",
        description:"Vue3技术栈开发模版",
        branch:"dev11"
       }],
       ["Vite-template",{
        name:"Vue-template",
        downloadUrl:"git@gitee.com:sohucw/admin-pro.git",
        description:"Vue3技术栈开发模版",
        branch:"dev10"
       }]
    ]
)

export function isOvewrite(fileName:string){
    console.warn(`${fileName} 文件夹存在`);
    return select({
        message:"是否覆盖",
        choices:[
            {name:"覆盖",value:true},
            {name:"取消",value:false}
        ]
    })
}

export async function create(projectName?:string){
    // 初始化模版列表
    const templateList = Array.from(templates).map((item:[string,TemplateInfo])=>{
        const [name,info] = item;
        return {
            name,
            value:name,
            description:info.description
        }
    })
    if(!projectName){
        projectName = await input({message:"请输入项目名称"})
    }
    // 如果文件夹存在，则提示是否覆盖
    const filePath = path.resolve(process.cwd(),projectName)
    if(fs.existsSync(filePath)){
        const run = await isOvewrite(projectName)
        if(run){
            await fs.remove(filePath)
        }else{
            return //不覆盖直接结束
        }
    }

    const templateName = await select({
        message:"请选择模版",
        choices:templateList
    })
    const info = templates.get(templateName)
    if(info){
        clone(info.downloadUrl,projectName,['-b',info.branch])
    }
}