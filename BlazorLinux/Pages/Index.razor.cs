// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Demo.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.IO;
using System.Reflection;

namespace BlazorLinux.Pages;

/// <summary>
/// 
/// </summary>
public partial class Index : IAsyncDisposable
{
    [Inject] IJSRuntime? JS { get; set; }

    private IJSObjectReference? module;

    private DotNetObjectReference<Index>? instance { get; set; }
    private string? LongRunningTaskState { get; set; }

    private string? DataState { get; set; }

    private string? RawData { get; set; }

    private string? SerialsData { get; set; }

    private string? Error { get; set; }


    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                module = await JS!.InvokeAsync<IJSObjectReference>("import", "./app.js");
                instance = DotNetObjectReference.Create(this);
            }
        }
        catch (Exception e)
        {
        }
    }

    /// <summary>
    /// 打开文件
    /// </summary>
    public virtual async Task StartLongRunningTask()
    {
        var dirs = await module!.InvokeAsync<object>("startLongRunningTask", instance);
        LongRunningTaskState = dirs.ToString();
    }

    /// <summary>
    /// 打开文件
    /// </summary>
    public virtual async Task GetData()
    {
        var dirs = await module!.InvokeAsync<object>("getData", instance);
        DataState = dirs.ToString();
    }

    /// <summary>
    /// 打开文件
    /// </summary>
    public virtual async Task ShowWindow()
    {
        await module!.InvokeVoidAsync("showWindow", instance);
    }


    /// <summary>
    /// 打开文件
    /// </summary>
    public virtual Task ShowSerials()
    {
        SerialsData = string.Join(",", System.IO.Ports.SerialPort.GetPortNames().ToList());
        return Task.CompletedTask;
    }

    /// <summary>
    /// 获取文件信息完成回调方法
    /// </summary> 
    /// <returns></returns>
    [JSInvokable]
    public async Task GetStatus(string apiResult)
    {
        try
        {
            Console.WriteLine(apiResult);
            RawData = apiResult;
            StateHasChanged();
        }
        catch 
        {
        }
    }

    /// <summary>
    /// 获取文件信息完成回调方法
    /// </summary> 
    /// <returns></returns>
    [JSInvokable]
    public async Task GetResult(ApiResult e)
    {
        try
        {
            Console.WriteLine(e);
            RawData = $"{e.success},{e.value},{e.error}";
            if (e.success)
            {

            }
            else
            {
                Error=e.error .ToString ();
            }
            StateHasChanged();
        }
        catch 
        {
        }
    }

    /// <summary>
    /// 获取文件信息完成回调方法
    /// </summary> 
    /// <returns></returns>
    [JSInvokable]
    public async Task GetResult2(ApiResult2 e)
    {
        try
        {
            Console.WriteLine(e);
            RawData = $"{e.success},{e.value},{e.error}";
            if (e.success)
            {
                DataState= $"{e.value.Number},{e.value.Text}";
            }
            else
            {
                Error=e.error .ToString ();
            }
            StateHasChanged();
        }
        catch 
        {
        }
    }

    public class ApiResult
    {
        public bool success { get; set; }
        public object error { get; set; }
        public virtual object value { get; set; }
    }

    public class ApiResult2:ApiResult
    {
        public SomeDataModel value { get; set; }
    }


    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (module is not null)
        {
            await module.DisposeAsync();
        }
    }

}
