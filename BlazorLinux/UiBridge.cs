﻿using System;
using System.Threading;
using System.Threading.Tasks; 
using Demo.Models;

namespace Demo
{
    public class UiBridge
    {
        private readonly Random random = new();

        public async Task RunLongProcedureOnTask()
        {
            await Task.Delay(TimeSpan.FromSeconds(2));
        }

        public void RunLongProcedure()
        {
            Thread.Sleep(TimeSpan.FromSeconds(10));
        }

        public SomeDataModel GetSomeData()
        {
            return new SomeDataModel
            {
                Text = "Hello World",
                Number = random.Next(100),
            };
        }

        public double Power(PowerModel model)
        {
            return Math.Pow(model.Value, model.Power);
        }

        public void ProduceError()
        {
            throw new Exception("Intentional exception from .Net");
        }
    }
}
