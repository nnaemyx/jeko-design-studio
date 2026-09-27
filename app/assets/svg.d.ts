declare module "*.svg" {
  const SvgComponent: import("react").FC<
    import("react").SVGProps<SVGSVGElement>
  >;
  export default SvgComponent;
}
