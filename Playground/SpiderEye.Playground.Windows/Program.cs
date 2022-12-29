using System;
using SpiderEye.Playground.Core;
using SpiderEye.Windows;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace SpiderEye.Playground
{
    class Program : ProgramBase
    {
        [STAThread]
        public static void Main(string[] args)
        {
            WindowsApplication.Init();
            var icon = AppIcon.FromFile("icon", ".");

            using var statusIcon = new StatusIcon();
            using var window = new Window();
            window.Title = "SpiderEye Playground";
            window.UseBrowserTitle = true;
            window.EnableScriptInterface = true;
            window.CanResize = true;
            window.BackgroundColor = "#303030";
            window.Size = new Size(800, 600);
            window.MinSize = new Size(300, 200);
            window.MaxSize = new Size(1200, 900);
            window.Icon = icon;
            window.EnableDevTools = true;

            statusIcon.Icon = icon;
            statusIcon.Title = window.Title;


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

            statusIcon.Menu = menu;

            var bridge = new UiBridge();
            Application.AddGlobalHandler(bridge);


            Application.ContentProvider = new EmbeddedContentProvider("bridge");
            Application.Run(window, "bridge.component.html");

        }
    }
}
