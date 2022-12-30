using BlazorLinux.Data;
using Demo;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using SpiderEye;
using Application = SpiderEye.Application;
using Size = SpiderEye.Size;
using OperatingSystem = SpiderEye.OperatingSystem;
#if WINDOWS
using SpiderEye.Windows;
#else
using SpiderEye.Linux;
using SpiderEye.Mac;
#endif

internal class Program
{
    private static void MainSsr(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddRazorPages();
        builder.Services.AddServerSideBlazor();
        builder.Services.AddSingleton<WeatherForecastService>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            //app.UseHsts();
        }

        //app.UseHttpsRedirection();

        app.UseStaticFiles();

        app.UseRouting();

        app.MapBlazorHub();
        app.MapFallbackToPage("/_Host");

        app.RunAsync();
    }


    [STAThread]
    public static void Main(string[] args)
    {
        MainSsr(args);
  
#if WINDOWS
        WindowsApplication.Init();
#else
        if (Application.OS == OperatingSystem.Linux)
        {
            LinuxApplication.Init();
        }
        else if (Application.OS == OperatingSystem.MacOS)
        {
            MacApplication.Init();
        }
#endif
        var icon = AppIcon.FromFile("icon", AppDomain.CurrentDomain.BaseDirectory );

#if WINDOWS
        using var statusIcon = new StatusIcon();
#endif
        using var window = new Window();
        window.Title = "BlazorLinux (Linux/Win/Mac)";
        window.UseBrowserTitle = true;
        window.EnableScriptInterface = true;
        window.CanResize = true;
        window.BackgroundColor = "#303030";
        window.Size = new Size(1000, 700);
        window.MinSize = new Size(300, 200);
        window.MaxSize = new Size(1200, 900);
        window.Icon = icon;

#if DEBUG
        window.EnableDevTools = true;
#endif

#if WINDOWS
       statusIcon.Icon = icon;
       statusIcon.Title = window.Title;
#endif


        var menu = new Menu();
        var showItem = menu.MenuItems.AddLabelItem("Hello World");
        showItem.SetShortcut(ModifierKey.Primary, Key.O);

        var eventItem = menu.MenuItems.AddLabelItem("Send Event to Webview");
        eventItem.SetShortcut(ModifierKey.Primary, Key.E);
        eventItem.Click += async (s, e) => await window.Bridge.InvokeAsync("dateUpdated", DateTime.Now);

        var subMenuItem = menu.MenuItems.AddLabelItem("Open me!");
        subMenuItem.MenuItems.AddLabelItem("Boo!");

        var borderItem = menu.MenuItems.AddLabelItem("Window Border");
        var def = borderItem.MenuItems.AddLabelItem("Default");
        def.Click += (s, e) => { window.BorderStyle = WindowBorderStyle.Default; };
        var none = borderItem.MenuItems.AddLabelItem("None");
        none.Click += (s, e) => { window.BorderStyle = WindowBorderStyle.None; };

        var sizeItem = menu.MenuItems.AddLabelItem("Window Size");
        var max = sizeItem.MenuItems.AddLabelItem("Maximize");
        max.Click += (s, e) => { window.Maximize(); };
        var unmax = sizeItem.MenuItems.AddLabelItem("Unmaximize");
        unmax.Click += (s, e) => { window.Unmaximize(); };
        var min = sizeItem.MenuItems.AddLabelItem("Minimize");
        min.Click += (s, e) => { window.Minimize(); };
        var unmin = sizeItem.MenuItems.AddLabelItem("Unminimize");
        unmin.Click += (s, e) => { window.Unminimize(); };
        var full = sizeItem.MenuItems.AddLabelItem("Enter Fullscreen");
        full.Click += (s, e) => { window.EnterFullscreen(); };
        var unfull = sizeItem.MenuItems.AddLabelItem("Exit Fullscreen");
        unfull.SetShortcut(ModifierKey.Primary, Key.F11);
        unfull.Click += (s, e) => { window.ExitFullscreen(); };

        menu.MenuItems.AddSeparatorItem();

        var exitItem = menu.MenuItems.AddLabelItem("Exit");
        exitItem.Click += (s, e) => Application.Exit();

#if WINDOWS
       statusIcon.Menu = menu;
#endif

        var bridge = new UiBridge();
        Application.AddGlobalHandler(bridge);

        //Application.ContentProvider = new EmbeddedContentProvider("https://localhost:7047");
        //Application.Run(window, "https://blazor.app1.es");
        Application.Run(window, "http://localhost:5000");

    }

}

