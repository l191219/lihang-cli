import simpleGit,{SimpleGitOptions} from "simple-git"
import createLogger from"progress-estimator"
import chalk from "chalk"
// 初始化进度条
const logger = createLogger({
    spinner:{
        interval:300,
        frames:["✨","🎉","💎","✨","🎉","💎","✨","🎉","💎"].map((item)=>{
            return chalk.green(item);
        })
    }
})
const gitOptions :Partial<SimpleGitOptions> = {
    baseDir:process.cwd(),//当前工作目录
    binary:'git',//指定 git 二进制文件路径
    maxConcurrentProcesses:6,//最大并发进程
    trimmed:false
}
export const clone = async(url:string,projectName:string,options:string[])=>{
    const git = simpleGit(gitOptions);
    try{
        await logger(git.clone(url,projectName,options),"代码下载中...",{
            estimate:7000,//预计下载时间
        })
        console.log(chalk.green("代码下载完成"));
        console.log(chalk.green("========================================"));
        console.log(chalk.green("========欢迎使用 lihang-cli脚手架========"));
        console.log(chalk.green("========================================"));
        console.log(chalk.green("========请使用 pnpm install 安装依赖========"));
        console.log(chalk.green("========请使用 pnpm run dev 启动项目========"));
        console.log(chalk.green("========================================"));
        
    } catch(err){
        console.log(chalk.red("代码下载失败"));
        console.error('clone error:',err); 
    }
}