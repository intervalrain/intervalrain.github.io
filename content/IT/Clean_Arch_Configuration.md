---
title: "[IT] 使用 Clean Architecture + DDD 建置 Restful API"
keywords: ["IT", "C#", "Clean Architecture"]
description: 
date: 2024-02-26T15:03:15+08:00
tags: ["IT", "C#", "Clean Architecture"]
draft: false
Categories: "IT"
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
mermaid: true
hidemeta: false
canonicalURL: "https://intervalrain.github.io/"
disableHLJS: true
disableShare: true
disableHLJS: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowCodeCopyButtons: true
---
# 程式碼
https://github.com/intervalrain/webapi_ca/

# 正文
## 建置 Solution
+ 首先先參考 Clean Architecture 最經典的同心圓，來確定我們需要將我們的解決方案做哪些分層：
    + 我將使用 Restful API 做為我們 I/O (Presentation Layer)
    + 並且我需要配備身份驗證的機制 (Presentation Layer)
    + 我使用 PostgresDB 作為我的 (Infrastructure Layer)
    + 我的核心商業邏輯 (Application / Domain Layer)
{{< img "https://herbertograca.files.wordpress.com/2017/04/cleanarchitecture-5c6d7ec787d447a81b708b73abba1680.jpg" 480 >}}

+ 創建專案
```vim
dotnet new sln -o Mysln
```
+ 進入專案所在的資料夾
```vim
cd Mysln
```
+ 根據預先的分層建立專案資料夾，並且使用 dotnet 指令建立相對應的專案類型。
    + Api --> WebAPI
    + Infrastructure --> classlib
    + Contracts --> classlib
    + Application --> classlib
    + Domain --> classlib
```vim
dotnet new webapi -o Mysln.Api
dotnet new classlib -o Mysln.Contracts
dotnet new classlib -o Mysln.Infrastructure
dotnet new classlib -o Mysln.Application
dotnet new classlib -o Mysln.Domain
```
+ 接著我們需要把產生的專案資料夾，加入到我們的 Solution。
```vim
dotnet sln add Mysln.Api
dotnet sln add Mysln.Application
dotnet sln add Mysln.Contracts
dotnet sln add Mysln.Domain
dotnet sln add Mysln.Infrastructure
```
+ 接下來按照 Clean Architecture 的依賴原則來設定 dependency，依我的專案來說依賴方向如下。
{{<mermaid>}}
graph TD;
  Api-->Contracts;
  Api-->Application;
  Infrastructure-->Application
  Application-->Domain
  Api-.->Infrastructure
{{</mermaid>}}
```vim
dotnet add Mysln.Api reference Mysln.Contracts Mysln.Application
dotnet add Mysln.Infrastructure reference Mysln.Application
dotnet add Mysln.Application reference Mysln.Domain
dotnet add Mysln.Api reference Mysln.Infrastructure
```
+ 至此，已經完成了基本的 hierarchy 建置，接下來要為 Restful Client 做準備。

## Login Authentication
+ 作為驗證的需要，我們需要以下三種驗證檔案，包含兩個 Request 與一個 Response
```csharp
public record RegisterRequest(
    string FirstName,
    string LastName,
    string Email,
    string Password
);

public record LoginRequest(
    string Email,
    string Password
);

public record AuthenticationResponse(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    string token
);
```
+ 到 Controller 去設置註冊與登入的兩個路由，並且將之後的服務介面預先注入到其中。
```csharp
[ApiController]
[Route("auth")]
public class AuthenticationController : ControllerBase
{
	[HttpPost("register")]
	public IActionResult Register(RegisterRequest request)
	{
		return Ok(request);
	}

	[HttpPost("login")]
	public IActionResult Login(LoginRequest request)
	{
		return Ok(request);
	}
}
```
+ 接著我們創建 Application 中的服務，注意到因為 Application 不依賴於 Contracts，故我們這邊需要創建自己的 DataModel
```csharp
public record AuthenticationResult
(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    string Token
);
```
+ 接著我們定義出 Application 的 Service。
```csharp
public interface IAuthenticationService
{
	AuthenticationResult Register(string firstName, string lastName, string email, string password);
    AuthenticationResult Login(string email, string password);
}
```
+ 定義好我們的 service interface 之後，就可以到 Presentation 中將我們的 service 注入到 presentation 之中。
```csharp
[ApiController]
[Route("auth")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AuthenticationController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("register")]
	public IActionResult Register(RegisterRequest request)
	{
		var authResult = _authenticationService.Register(
			request.FirstName,
			request.LastName,
			request.Email,
			request.Password);
		var response = new AuthenticationResponse(
            authResult.Id,
            authResult.FirstName,
            authResult.LastName,
            authResult.Email,
            authResult.Token);
		return Ok(response);
	}

	[HttpPost("login")]
	public IActionResult Login(LoginRequest request)
	{
        var authResult = _authenticationService.Login(
            request.Email,
            request.Password);
        var response = new AuthenticationResponse(
            authResult.Id,
            authResult.FirstName,
            authResult.LastName,
            authResult.Email,
            authResult.Token);
        return Ok(response);
    }
}
```
+ 我們已經定義好我們的 service 後，便可以到 presentation 的 Program(或是其它入口點，如 Startup.cs 或 MauiProgram.cs)，做 service 的依賴注入。
```csharp
using BuberDinner.Application.Services.Authentication;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}
```

+ 最後，我們先實作一個暫時的 Service，來確認 Api 是可以作業的。
```csharp
public class AuthenticationService : IAuthenticationService
{
    public AuthenticationResult Register(string firstName, string lastName, string email, string password)
    {
        return new AuthenticationResult(
            Guid.NewGuid(),
            firstName,
            lastName,
            email,
            "token"
            );
    }

    public AuthenticationResult Login(string email, string password)
    {
        return new AuthenticationResult(
            Guid.NewGuid(),
            "firstName",
            "lastName",
            email,
            "token"
            );
    }
}
```
+ 執行 `dotnet run --project .\Mysln.Api\`
+ 在 Swagger 中測試我們實作的 `register` 與 `login` API，如果正常工作，會回傳 StatusCode: 200。

## Dependency Injection
+ 我們想要每一層都可以自己管理自己的注入，此時我們需要引入 `Microsoft.Extensions.DependencyInjection`。
+ 接下來實作 Application 的 DependencyInjection。
```csharp
public static class DependencyInjection
{
    public static IServiceCollection AddApllication(this IServiceCollection services)
    {
        services.AddScope<IAuthenticationService, AuthenticationService>();
        return services;
    }
}
```
+ 接下來實作 Infrastructure 的 DependencyInjection。(暫時還沒有注入 repository)
```csharp
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        // 未來要注入 repositories
        return services;
    }
}
```
+ 接下來我們可以改寫 `Program.cs`。
```csharp
using BuberDinner.Application;
using BuberDinner.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddApplication()
        .AddInfrastructure();
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}
```

# 實作 JWT Token Generator
+ 首先先在 Application Layer 創建一個 interface 來做依賴反轉
```csharp
public interface IJwtTokenGenerator
{
    string GenerateToken(Guid userId, string firstName, string lastName);
}
```
+ 接著我們到 Infrastructure Layer 來實作我們的 JwtTokenGenerator。
+ 首先我們需要 `System.IdentityModel.Tokens.Jwt` 這個 Package。
+ 接著我們實作 `JwtTokenGenerator`。
```csharp
public class JwtTokenGenerator : IJwtTokenGenerator
{
    public string GenerateToken(Guid userId, string firstName, string lastName)
    {
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("super-secret-key")),
            SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.GivenName, firstName),
            new Claim(JwtRegisteredClaimNames.FamilyName, lastName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var securityToken = new JwtSecurityToken(
            issuer: "Mysln",
            expires: DateTime.Now.AddDays(1),
            claims: claims,
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}
```
+ 接著我們將之注入到服務中，即大功告成了。
```csharp
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        return services;
    }
}
```
# 使用 Options Pattern 注入 JWT Settings
+ 接下來我們要使用 Options Pattern 將 JWT Settings 注入到 JwtTokenGenerator 中。
+ 首先我們先到 `Mysln.Api` 的 `appsettings.json` 中將 options 設置完成。
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
    "JwtSettings": {
    "Secret": "super-secret-key",
    "ExpiryMinutes": 60,
    "Issuer": "Mysln",
    "Audience:": "Mysln"
  }
}
```
+ 由於我們要使用 Options Pattern，我們需要改寫我們的 `Program.cs`，並且將 ConfigurationManager 注入到 Infrastructure 的 DependencyInjection。
+ 為此我們需要引入套件 `Microsoft.Extensions.Configuration` 與 `Microsoft.Extensions.Options.ConfigurationExtensions`。
+ 並且我們需要創建一個 Model。
```csharp
public class JwtSettings
{
    public const string SectionName = "JwtSettings";
	public string Secret { get; init; } = null!;
	public int ExpiryMinutes { get; init; }
	public string Issuer { get; init; } = null!;
	public string Audience { get; init; } = null!;
}
```
+ `Program.cs` 需改寫成：
```csharp
builder.Services
        .AddApplication()
        .AddInfrastructure(builder.Configuration);
```
+ 將 `DependencyInjection` 改寫成：
```csharp
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        return services;
    }
}
```
+ 接下來，我們可以把 JwtTokenGenerator 改寫成：
```csharp
public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly JwtSettings _jwtSettings;
    private readonly IDateTimeProvider _dateTimeProvider;

    public JwtTokenGenerator(IDateTimeProvider dateTimeProvider, IOptions<JwtSettings> jwtOptions)
    {
        _dateTimeProvider = dateTimeProvider;
        _jwtSettings = jwtOptions.Value;
    }

    public string GenerateToken(Guid userId, string firstName, string lastName)
    {
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
            SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.GivenName, firstName),
            new Claim(JwtRegisteredClaimNames.FamilyName, lastName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var securityToken = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            expires: _dateTimeProvider.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
            claims: claims,
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}
```
+ 以上就大功告成了。