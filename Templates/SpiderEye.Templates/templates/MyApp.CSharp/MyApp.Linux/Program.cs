﻿using System;
using SpiderEye.Linux;
using MyApp.Core;

namespace MyApp
{
    class Program : ProgramBase
    {
        [STAThread]
        public static void Main(string[] args)
        {
            LinuxApplication.Init();
            Run();
        }
    }
}
