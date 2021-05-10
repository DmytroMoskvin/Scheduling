using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {

        public Token GetJWT(string jwt) =>
            Context.Tokens.FirstOrDefault(token => token.Jwt == jwt);
        public void AddJWT(string jwt)
        {
            Context.Tokens.Add(new Token { Jwt = jwt });
            Context.SaveChanges();
        }

        public void RemoveJWT(string jwt)
        {
            Token token = Context.Tokens.FirstOrDefault(token => token.Jwt == jwt);
            if (token == null)
                return;

            Context.Tokens.Remove(token);
            Context.SaveChanges();
        }
    }
}
