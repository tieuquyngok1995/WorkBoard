using System.Net.WebSockets;

namespace WorkBoardServer.Helpers
{
    public interface ICustomWebSocketManager
    {
        void AddSocket(string userId, WebSocket socket);

        void RemoveSocket(string userId);

        WebSocket GetSocketByUserId(string userId);

    }

    public class CustomWebSocketManager : ICustomWebSocketManager
    {
        private readonly Dictionary<string, WebSocket> _sockets = new();

        public void AddSocket(string userId, WebSocket socket)
        {
            if (!_sockets.ContainsKey(userId))
            {
                _sockets[userId] = socket;
            }
        }

        public void RemoveSocket(string userId)
        {
            if (_sockets.ContainsKey(userId))
            {
                _sockets[userId].Dispose();
                _sockets.Remove(userId);
            }
        }

        public WebSocket GetSocketByUserId(string userId)
        {
            _sockets.TryGetValue(userId, out var socket);
            return socket;
        }
    }
}