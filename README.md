# SAMPLE THREEJS rev.: 0.139.2 GLTF + COMPRESSIONS

Base created sample with VITE

* [x] Load GLTF
* [x] + Draco (compress only mesh)
* [x] + Quantize (Quantize geometry, reducing precision and memory)
* [ ] Load KTX2
* [ ] Load Basis
* [x] + Meshopt (compress mesh + animations)

## INSTALATION & TOOLS

*** gltf-transform ***

Download from: https://gltf-transform.donmccurdy.com/cli.html
```shell
npm install --global @gltf-transform/cli
```

*** toktx ***
Download from: https://github.com/KhronosGroup/KTX-Software/releases

## CLI

```shell
gltf-transform draco DamagedHelmetEmmbed.gltf DamagedHelmetEmmbedDraco.gltf
info: DamagedHelmetEmmbed.gltf (5.03 MB) → DamagedHelmetEmmbedDraco.gltf (3.29 MB)
------
gltf-transform draco DamagedHelmetEmmbed.gltf DamagedHelmetDracoUltra.gltf --encode-speed 10
info: DamagedHelmetEmmbed.gltf (5.03 MB) → DamagedHelmetDracoUltra.gltf (3.33 MB)
```

```shell
gltf-transform draco DamagedHelmetEmmbed.gltf DamagedHelmetDraco.gltf       
info: DamagedHelmetEmmbed.gltf (5.03 MB) → DamagedHelmetDraco.gltf (3.29 MB)
```

```shell
gltf-transform meshopt DamagedHelmetEmmbed.gltf DamagedHelmetMeshopt.gltf
info: prune: Removed types... Accessor (4)
warn: quantize: Skipping TEXCOORD_0; out of [0,1] range.
info: prune: Removed types... Accessor (1)
info: DamagedHelmetEmmbed.gltf (5.03 MB) → DamagedHelmetMeshopt.gltf (3.4 MB)
```

```shell
gltf-transform etc1s DamagedHelmetEmmbed.gltf DamagedHelmetKTX-etc1s.gltf
info: DamagedHelmetEmmbed.gltf (5.03 MB) → DamagedHelmetKTX-etc1s.gltf (2.65 MB)
```

```shell
gltf-transform uastc DamagedHelmetEmmbed.gltf 
info: DamagedHelmetEmmbed.gltf (5.03 MB) → DamagedHelmetKTX-uastc.gltf (13.44 MB)
```

### DOCS

* Preview: https://github.com/donmccurdy/three-gltf-viewer/blob/main/src/viewer.js
* Draco: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_draco_mesh_compression
* https://google.github.io/draco/spec/

* Sample: https://github.com/brunosimon/doom-portal-in-webgl

* Cli: https://gltf-transform.donmccurdy.com/cli.html
* https://gitcode.net/mirrors/khronosgroup/gltf/-/tree/automated-results-do-not-merge/extensions/2.0/Khronos/KHR_draco_mesh_compression?from_codechina=yes

* basis: https://discourse.threejs.org/t/compressed-texture-workflow-gltf-basis/10039/8

### USAGE DRACO

  
    ▸ gltf-transform draco <input> <output> [OPTIONS...]


  Compress mesh geometry with the Draco library. This type of compression affects
  only geometry data — animation and textures are not compressed.
  
  Compresses
  - geometry (only triangle meshes)
  
  Documentation
  - https://gltf-transform.donmccurdy.com/classes/extensions.dracomeshcompression.html
  
  References
  - draco: https://github.com/google/draco
  - KHR_draco_mesh_compression: https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_draco_mesh_compression/


  ARGUMENTS

    <input>                              Path to read glTF 2.0 (.glb, .gltf) model              
    <output>                             Path to write output                                   

  OPTIONS

    --decode-speed <decodeSpeed>         Decoding speed vs. compression level, 1–10.            
                                         number, default: 5                                     
    --encode-speed <encodeSpeed>         Encoding speed vs. compression level, 1–10.            
                                         number, default: 5                                     
    --method <method>                    Compression method.                                    
                                         one of "edgebreaker","sequential", default:            
                                         "edgebreaker"                                          
    --quantization-volume <volume>       Bounds for quantization grid.                          
                                         one of "mesh","scene", default: "mesh"                 
    --quantize-color <bits>              Quantization bits for COLOR_*, 1-16.                   
                                         number, default: 8                                     
    --quantize-generic <bits>            Quantization bits for other attributes, 1-16.          
                                         number, default: 12                                    
    --quantize-normal <bits>             Quantization bits for NORMAL, 1-16.                    
                                         number, default: 10                                    
    --quantize-position <bits>           Quantization bits for POSITION, 1-16.                  
                                         number, default: 14                                    
    --quantize-texcoord <bits>           Quantization bits for TEXCOORD_*, 1-16.                
                                         number, default: 12               
                                         GLOBAL OPTIONS

    -h, --help                           Display global help or command-related help.           
    -V, --version                        Display version.                                       
    -v, --verbose                        Verbose mode: will also output debug messages.         
    --allow-http                         Allows reads from HTTP requests.                       
                                         boolean                                                
    --vertex-layout <layout>             Vertex buffer layout preset.                           
                                         one of "interleaved","separate", default:              
                                         "interleaved"              

### USAGE etc1s

SUMMARY
  
    Compresses textures in the given file to .ktx2 GPU textures using the
    ETC1S Basis Universal bitstream. GPU textures offer faster GPU upload
    and less GPU memory consumption than traditional PNG or JPEG textures,
    which are fully uncompressed in GPU memory. GPU texture formats require
    more attention to compression settings to get similar visual results.
    
    ETC1S, one of the two Basis Universal bitstreams, offers lower size and lower
    quality than UASTC. In some cases it may be useful to increase the resolution
    of the texture, to minimize compression artifacts while still retaining an
    overall smaller filesize. Consider using less aggressive compression settings
    for normal maps than for other texture types: you may want to use UASTC for
    normal maps and ETC1S for other textures, for example.
    
    Documentation:
    https://gltf-transform.donmccurdy.com/extensions.html#khr_texture_basisu
    
    Dependencies:
    KTX-Software (https://github.com/KhronosGroup/KTX-Software/)

ARGUMENTS

    <input>                              Path to read glTF 2.0 (.glb, .gltf) model              
    <output>                             Path to write output                                   

  OPTIONS

    --compression <clevel>               Compression level, an encoding speed vs. quality       
                                         tradeoff. Higher values are slower, but give higher    
                                         quality. Try --quality before experimenting with this  
                                         option.                                                
                                         one of 0,1,2,3,4,5, default: 1                         
    --filter <filter>                    Specifies the filter to use when generating mipmaps.   
                                         one of                                                 
                                         "box","tent","bell","b-spline","mitchell",             
                                         "lanczos3","lanczos4","lanczos6","lanczos12",          
                                         "blackman","kaiser","gaussian","catmullrom",           
                                         "quadratic_interp","quadratic_approx","quadratic_      
                                         mix", default: "lanczos4"                              
    --filter-scale <fscale>              Specifies the filter scale to use when generating      
                                         mipmaps.                                               
                                         number, default: 1                                     
    --max-endpoints <max_endpoints>      Manually set the maximum number of color endpoint      
                                         clusters from 1-16128.                                 
                                         number                                                 
    --max-selectors <max_selectors>      Manually set the maximum number of color selector      
                                         clusters from 1-16128.                                 
                                         number                                                 
    --power-of-two                       Resizes any non-power-of-two textures to the closest   
                                         power-of-two dimensions, not exceeding 2048x2048px.    
                                         Required for  compatibility on some older devices and  
                                         APIs, particularly  WebGL 1.0.                         
                                         boolean                                                
    --quality <qlevel>                   Quality level. Range is 1 - 255. Lower gives better    
                                         compression, lower quality, and faster encoding. Higher
                                         gives less compression, higher quality, and slower     
                                         encoding. Quality level determines values of           
                                         --max_endpoints and --max-selectors, unless those      
                                         values are explicitly set.                             
                                         number, default: 128                                   
    --rdo-off                            Disable endpoint and selector RDO (slightly faster,    
                                         less noisy output, but lower quality per output bit).  
                                         boolean                                                
    --rdo-threshold <rdo_threshold>      Set endpoint and selector RDO quality threshold. Lower 
                                         is higher quality but less quality per output bit (try 
                                         1.0-3.0). Overrides --quality.                         
                                         number                                                 
    --slots <slots>                      Texture slots to include (glob)                        
                                         default: "*"                                           

  GLOBAL OPTIONS

    -h, --help                           Display global help or command-related help.           
    -V, --version                        Display version.                                       
    -v, --verbose                        Verbose mode: will also output debug messages.         
    --allow-http                         Allows reads from HTTP requests.                       
                                         boolean                                                
    --vertex-layout <layout>             Vertex buffer layout preset.                           
                                         one of "interleaved","separate", default:              
                                         "interleaved"  

### USAGE uastc

SUMMARY
  
    Compresses textures in the given file to .ktx2 GPU textures using the
    UASTC Basis Universal bitstream. GPU textures offer faster GPU upload
    and less GPU memory consumption than traditional PNG or JPEG textures,
    which are fully uncompressed in GPU memory. GPU texture formats require
    more attention to compression settings to get similar visual results.
    
    UASTC, one of the two Basis Universal bitstreams, offers higher size and higher
    quality than ETC1S. While it is suitable for all texture types, you may find it
    useful to apply UASTC only where higher quality is necessary, and apply ETC1S
    for textures where the quality is sufficient.
    
    Documentation:
    https://gltf-transform.donmccurdy.com/extensions.html#khr_texture_basisu
    
    Dependencies:
    KTX-Software (https://github.com/KhronosGroup/KTX-Software/)


  ARGUMENTS

    <input>                              Path to read glTF 2.0 (.glb, .gltf) model              
    <output>                             Path to write output                                   

  OPTIONS

    --filter <filter>                    Specifies the filter to use when generating mipmaps.   
                                         one of                                                 
                                         "box","tent","bell","b-spline","mitchell",             
                                         "lanczos3","lanczos4","lanczos6","lanczos12",          
                                         "blackman","kaiser","gaussian","catmullrom",           
                                         "quadratic_interp","quadratic_approx","quadratic_      
                                         mix", default: "lanczos4"                              
    --filter-scale <fscale>              Specifies the filter scale to use when generating      
                                         mipmaps.                                               
                                         number, default: 1                                     
    --level <level>                      Create a texture in high-quality transcodable UASTC    
                                         format. The optional parameter <level> selects a speed 
                                         vs quality tradeoff as shown in the following table:   
                                                                                                
                                         Level | Speed     | Quality                            
                                         ——————|———————————|————————                            
                                         0     | Fastest   | 43.45dB                            
                                         1     | Faster    | 46.49dB                            
                                         2     | Default   | 47.47dB                            
                                         3     | Slower    | 48.01dB                            
                                         4     | Very slow | 48.24dB                            
                                         one of 0,1,2,3,4, default: 2                           
    --power-of-two                       Resizes any non-power-of-two textures to the closest   
                                         power-of-two dimensions, not exceeding 2048x2048px.    
                                         Required for  compatibility on some older devices and  
                                         APIs, particularly  WebGL 1.0.                         
                                         boolean                                                
    --rdo <uastc_rdo_l>                  Enable UASTC RDO post-processing and optionally set    
                                         UASTC RDO quality scalar (lambda).  Lower values yield 
                                         higher quality/larger LZ compressed files, higher      
                                         values yield lower quality/smaller LZ compressed files.
                                         A good range to try is [.25, 10]. For normal maps, try 
                                         [.25, .75]. Full range is [.001, 10.0].                
                                         number, default: 0                                     
    --rdo-block-scale <uastc_rdo_b>      Set UASTC RDO max smooth block error scale. Range is   
                                         [1.0, 300.0]. Default is 10.0, 1.0 is disabled. Larger 
                                         values suppress more artifacts (and allocate more bits)
                                         on smooth blocks.                                      
                                         number, default: 10                                    
    --rdo-dictionary-size <uastc_rdo_d>  Set UASTC RDO dictionary size in bytes. Default is     
                                         32768. Lower values=faster, but give less compression. 
                                         Possible range is [256, 65536].                        
                                         number, default: 32768                                 
    --rdo-multithreading <uastc_rdo_m>   Enable RDO multithreading (slightly lower compression, 
                                         non-deterministic).                                    
                                         boolean, default: true                                 
    --rdo-std-dev <uastc_rdo_s>          Set UASTC RDO max smooth block standard deviation.     
                                         Range is [.01, 65536.0]. Default is 18.0. Larger values
                                         expand the range of blocks considered smooth.          
                                         number, default: 18                                    
    --slots <slots>                      Texture slots to include (glob)                        
                                         default: "*"                                           
    --zstd <compressionLevel>            Supercompress the data with Zstandard. Compression     
                                         level range is [1, 22], or 0 is uncompressed. Lower    
                                         values decode faster but offer less compression. Values
                                         above 20 should be used with caution, requiring more   
                                         memory to decompress:                                  
                                                                                                
                                         Level | Window Size |                                  
                                         ——————|—————————————|                                  
                                         1     | 256 KB      |                                  
                                         …     | …           |                                  
                                         10    | 2 MB        |                                  
                                         …     | …           |                                  
                                         18    | 8 MB        |                                  
                                         19    | 8 MB        |                                  
                                         20    | 34 MB       |                                  
                                         21    | 67 MB       |                                  
                                         22    | 134 MB      |                                  
                                         number, default: 18                                    

  GLOBAL OPTIONS

    -h, --help                           Display global help or command-related help.           
    -V, --version                        Display version.                                       
    -v, --verbose                        Verbose mode: will also output debug messages.         
    --allow-http                         Allows reads from HTTP requests.                       
                                         boolean                                                
    --vertex-layout <layout>             Vertex buffer layout preset.                           
                                         one of "interleaved","separate", default:              
                                         "interleaved"          