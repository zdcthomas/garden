# in flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    language-servers.url = git+https://git.sr.ht/~bwolf/language-servers.nix;
    language-servers.inputs.nixpkgs.follows = "nixpkgs";
  };
  outputs = {
    self,
    nixpkgs,
    flake-utils,
    language-servers,
  }:
    flake-utils.lib.eachDefaultSystem
    (
      system: let
        overlays = [];
        pkgs = import nixpkgs {
          inherit system overlays;
        };
      in
        with pkgs; {
          devShells.default = mkShell {
            packages = with pkgs; [
              nodejs_20
              prettierd
              eslint_d
              language-servers.packages.${system}.typescript-language-server
            ];
          };
        }
    );
}
