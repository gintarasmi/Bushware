using IdentityModel;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Bushware
{
    public record UserInfo(int Id, bool Administrator = false);

    public interface IJwtService
    {
        public TokenValidationParameters TokenValidationParameters { get; }

        public string CreateToken(UserInfo info);
    }


    public class BasicJwtService : IJwtService
    {
        private readonly SymmetricSecurityKey _signingCredentials;
        private readonly string _issuer;

        public BasicJwtService(byte[] signingCredentials, string issuer)
        {
            _signingCredentials = new SymmetricSecurityKey(signingCredentials);
            _issuer = issuer;
        }

        public string CreateToken(UserInfo info)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Subject, info.Id.ToString()),
                new Claim(JwtClaimTypes.Role, "user")
            };

            if (info.Administrator)
                claims.Add(new Claim(JwtClaimTypes.Role, "admin"));

            var now = DateTime.UtcNow;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),

                Expires = now.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    _signingCredentials,
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var handler = new JwtSecurityTokenHandler();
            return handler.WriteToken(handler.CreateToken(tokenDescriptor));
        }

        public TokenValidationParameters TokenValidationParameters => new()
        {
            IssuerSigningKey = _signingCredentials,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidIssuer = _issuer,
        };
    }
}