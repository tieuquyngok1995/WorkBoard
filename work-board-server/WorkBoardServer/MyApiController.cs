using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace WorkBoardServer;

[Authorize]
public class MyApiController
    : ApiControllerAttribute, IRouteTemplateProvider
{
    private const string route = "api/[controller]/[action]";
    public string? Template => route;
    public int? Order => 1;
    public string? Name => route;
}