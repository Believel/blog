// 分片上传：将要上传的文件，按照一定的大小，将整个文件分别分隔成多个数据块来进行分片上传
// 大致流程：
// 1. 将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；
// 2. 初始化一个分片上传任务，返回本次分片上传唯一标识；
// 3. 按照一定的策略（串行或并行）发送各个分片数据块；
// 4. 发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件

// 断点续传：是在下载或上传时，将下载或上传任务人为的划分几个部分
// 每一部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有
// 必要从头开始上传下载。用户可以节省时间，提高速度

// 实现方式两种:
// 1. 服务端返回，告知从哪开始
// 2. 浏览器端自行处理


// 上传过程中将文件在服务器写为临时文件，等全部写完了（文件上传完），将此临时文件重命名为正式文件即可

// 如果中途上传中断过，下次上传的时候根据当前临时文件大小，作为在客户端读取文件的偏移量，从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可


// 切片上传失败怎么办？
// 上传过程中刷新页面怎么办
// 如何进行并行上传
// 切片什么时候按数量切，什么时候按大小切
// 如何结合web worker处理大文件上传
// 如何实现秒传
