<%@ WebService Language="C#" Class="WebService1" %>
using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Web;
using System.Web.Services;
using System;
using System.IO;
using System.Net;
using System.Text;


[WebService(Namespace = "http://uprinceworddev.azurewebsites.net/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.ComponentModel.ToolboxItem(false)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService1 : System.Web.Services.WebService
{

    [WebMethod]
    public string MyProxy(string url)
    {
        HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create(url);

        HttpWebResponse response = (HttpWebResponse)myRequest.GetResponse();
        using (StreamReader reader = new StreamReader(response.GetResponseStream()))
        {
            return reader.ReadToEnd();
        }

    }
}
