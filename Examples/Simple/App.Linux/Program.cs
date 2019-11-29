﻿using System;
using SpiderEye.Linux;
using SpiderEye.Example.Simple.Core;

namespace SpiderEye.Example.Simple
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
