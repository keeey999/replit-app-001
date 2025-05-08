/**
 * GitHub Pages用のアセットパス修正スクリプト
 * 
 * このスクリプトは、GitHub Pages環境で/assetsで始まるパスを
 * 相対パス./assetsに修正することで、アセットが正しく読み込まれるようにします。
 */
(function() {
  // パス修正関数
  function fixAssetPaths() {
    console.log('[PathFix] Checking for asset paths to fix...');

    // script要素のsrc属性を修正
    document.querySelectorAll('script[src]').forEach(el => {
      if (el.src.match(/\/assets\//)) {
        const originalSrc = el.src;
        const newSrc = el.src.replace(/^(.*?)\/assets\//, './assets/');
        el.setAttribute('src', newSrc);
        console.log('[PathFix] Fixed script:', originalSrc, '->', newSrc);
      }
    });
    
    // link要素のhref属性を修正
    document.querySelectorAll('link[href]').forEach(el => {
      if (el.href.match(/\/assets\//)) {
        const originalHref = el.href;
        const newHref = el.href.replace(/^(.*?)\/assets\//, './assets/');
        el.setAttribute('href', newHref);
        console.log('[PathFix] Fixed stylesheet:', originalHref, '->', newHref);
      }
    });
    
    // img要素のsrc属性を修正
    document.querySelectorAll('img[src]').forEach(el => {
      if (el.src.match(/\/assets\//)) {
        const originalSrc = el.src;
        const newSrc = el.src.replace(/^(.*?)\/assets\//, './assets/');
        el.setAttribute('src', newSrc);
        console.log('[PathFix] Fixed image:', originalSrc, '->', newSrc);
      }
    });

    console.log('[PathFix] Path fixing complete');
  }
  
  // 即時実行
  fixAssetPaths();
  
  // DOM読み込み完了時に実行
  document.addEventListener('DOMContentLoaded', fixAssetPaths);
  
  // ページロード完了時に実行
  window.addEventListener('load', fixAssetPaths);
  
  // 10ms後に実行（非同期リソースの読み込みがあるため）
  setTimeout(fixAssetPaths, 10);
  
  // 100ms後にも実行
  setTimeout(fixAssetPaths, 100);
})();