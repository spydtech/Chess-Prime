import { useRouteError, Link } from 'react-router-dom';
import { FaChessKing, FaHome, FaRedo } from 'react-icons/fa';

export function ErrorElement() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-b from-chess-dark to-chess-darker flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-chess-board bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-chess-gold">
        {/* Header with Chess Theme */}
        <div className="bg-gradient-to-r from-chess-dark to-chess-medium p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-chess-gold rounded-full mb-4">
            <FaChessKing className="text-4xl text-chess-dark" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Checkmate!</h1>
          <p className="text-chess-light">Something went wrong on the board</p>
        </div>

        {/* Error Content */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {error.status === 404 ? 'Page Not Found' : 'Game Error'}
            </h2>
            
            <div className="bg-black bg-opacity-30 rounded-xl p-6 mb-6">
              <p className="text-chess-light text-lg mb-2">
                {error.statusText || error.message || 'An unexpected error disrupted the game'}
              </p>
              {error.status && (
                <div className="inline-flex items-center gap-2 bg-chess-dark px-4 py-2 rounded-lg">
                  <span className="text-chess-gold font-mono">Error {error.status}</span>
                </div>
              )}
            </div>

            <p className="text-chess-light italic">
              Don't worry, even grandmasters make mistakes. Let's get you back in the game.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 bg-gradient-to-r from-chess-gold to-yellow-500 hover:from-yellow-500 hover:to-chess-gold text-chess-dark font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <FaHome className="text-xl group-hover:scale-110 transition-transform" />
              <span>Back to Lobby</span>
            </Link>
            
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-transparent hover:bg-white hover:bg-opacity-10 text-white font-bold py-4 px-6 rounded-xl border-2 border-chess-gold transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <FaRedo className="text-xl group-hover:rotate-180 transition-transform" />
              <span>Retry Move</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-chess-medium">
            <p className="text-chess-light mb-4">Quick Navigation:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/play-tournament" className="text-chess-gold hover:text-yellow-300 transition-colors">
                Play Game
              </Link>
              <span className="text-chess-medium">•</span>
              <Link to="/tournament" className="text-chess-gold hover:text-yellow-300 transition-colors">
                Tournaments
              </Link>
              <span className="text-chess-medium">•</span>
              <Link to="/profile" className="text-chess-gold hover:text-yellow-300 transition-colors">
                Profile
              </Link>
            </div>
          </div>

          {/* Debug Info */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8">
              <summary className="text-chess-light cursor-pointer font-medium">
                View Debug Information
              </summary>
              <pre className="mt-4 p-4 bg-black bg-opacity-50 rounded-lg text-sm text-gray-300 overflow-auto max-h-60">
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

// Add these colors to your tailwind.config.js
// chess: {
//   dark: '#1a1a2e',
//   medium: '#16213e',
//   board: '#769656',
//   gold: '#d4af37',
//   light: '#e0e0e0',
//   darker: '#0f3460',
// }